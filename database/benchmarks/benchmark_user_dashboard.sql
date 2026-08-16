\set ON_ERROR_STOP on
\timing on

-- ============================================================================
-- SuperPlanify user dashboard benchmark
-- ============================================================================
--
-- IMPORTANT
-- ---------
-- This dataset can become very large.
--
-- Default scale:
--   100,000 users
--     10,000 organizations
--          10 schedules per organization
--         100 unique events per schedule
--
-- Totals:
--   100,000 schedules
-- 10,000,000 events
--
-- Membership model:
--   Every user belongs to 1..5 organizations.
--   Memberships are deterministic but distributed differently per user.
--
-- Business query:
--   "For a given user, retrieve every event they can see across all their
--    organizations between two dates."
--
-- V1 access rule:
--   Membership in an organization grants read access to every schedule and
--   every event in that organization.
--
-- Schema naming used here:
--   organizations.id
--   organization_memberships.organization_id
--   schedules.organization_id
--   events.occurrence_starts_at_local
--   events.occurrence_ends_at_local
--
-- No org_id / recurrence_starts_at_local / recurrence_ends_at_local aliases.
--
-- ============================================================================
-- Scale knobs
-- ============================================================================

\set user_count 100000
\set organization_count 10000
\set schedules_per_organization 10
\set events_per_schedule 100

-- User chosen for the benchmark query.
\set benchmark_user_id 42424

-- Benchmark period.
\set window_start '''2025-08-11 00:00:00+00'''
\set window_end   '''2025-08-18 00:00:00+00'''

-- ============================================================================
-- Seed
-- ============================================================================

BEGIN;

-- Faster bulk loading for this disposable benchmark session.
-- Durability is intentionally relaxed for the seed transaction only.
SET LOCAL synchronous_commit = off;

TRUNCATE TABLE
    event_exception_custom_field_overrides,
    events_custom_field_values,
    activities_custom_field_values,
    event_exceptions,
    invitations,
    events,
    activities,
    organization_custom_fields,
    schedules,
    organization_memberships,
    organizations,
    users
RESTART IDENTITY CASCADE;

-- ----------------------------------------------------------------------------
-- Users
-- ----------------------------------------------------------------------------

INSERT INTO users (
    auth_provider_id,
    email,
    first_name,
    last_name,
    username,
    preferences,
    created_at,
    updated_at
)
SELECT
    'bench_user_' || user_no,
    'user' || user_no || '@superplanify.test',
    'User',
    user_no::text,
    'bench_user_' || user_no,
    '{}'::jsonb,
    now(),
    now()
FROM generate_series(1, :user_count) AS user_no;

-- ----------------------------------------------------------------------------
-- Organizations
-- ----------------------------------------------------------------------------
-- The first user creates all organizations for benchmark simplicity.
-- This does not affect the dashboard query path.

INSERT INTO organizations (
    name,
    description,
    created_by_user_id,
    settings,
    created_at,
    updated_at
)
SELECT
    'Benchmark Organization #' || organization_no,
    'Synthetic organization for massive PostgreSQL benchmark',
    1,
    '{}'::jsonb,
    now(),
    now()
FROM generate_series(1, :organization_count) AS organization_no;

-- ----------------------------------------------------------------------------
-- Organization memberships
-- ----------------------------------------------------------------------------
--
-- Each user belongs to between 1 and 5 organizations:
--
--   membership_count = 1 + (user_id % 5)
--
-- Organization assignment uses a deterministic arithmetic mapping so that:
--   - different users get different subsets;
--   - no random() call is needed for millions of rows;
--   - the dataset is reproducible;
--   - duplicate organizations for one user are avoided by construction.
--

INSERT INTO organization_memberships (
    organization_id,
    user_id,
    role,
    created_at,
    invited_by_user_id
)
SELECT
    1 + (
        (
            (u.id * 7)
            + (membership_no * 13)
        ) % :organization_count
    )::bigint AS organization_id,
    u.id,
    CASE
        WHEN u.id = 1 THEN 'admin'::organization_membership_role
        ELSE 'member'::organization_membership_role
    END,
    now(),
    1
FROM users AS u
CROSS JOIN LATERAL generate_series(
    1,
    1 + (u.id % 5)::integer
) AS membership_no;

-- ----------------------------------------------------------------------------
-- Schedules
-- ----------------------------------------------------------------------------
-- 10 schedules per organization by default.

INSERT INTO schedules (
    organization_id,
    name,
    description,
    settings,
    created_at,
    updated_at
)
SELECT
    o.id,
    'Organization ' || o.id || ' - Schedule #' || schedule_no,
    'Synthetic schedule for massive dashboard benchmark',
    '{}'::jsonb,
    now(),
    now()
FROM organizations AS o
CROSS JOIN generate_series(
    1,
    :schedules_per_organization
) AS schedule_no;

-- ----------------------------------------------------------------------------
-- Events
-- ----------------------------------------------------------------------------
--
-- 100 events per schedule by default.
--
-- Temporal distribution:
--   - first event: 2025-01-01 08:00 UTC
--   - one event every 4 days
--   - each event lasts 90 minutes
--
-- 100 events therefore span roughly 400 days.
-- Every schedule has the same time distribution so that schedule membership,
-- not random temporal skew, drives the benchmark.
--
-- 10,000 orgs × 10 schedules × 100 events = 10,000,000 events.

INSERT INTO events (
    schedule_id,
    source_activity_id,
    type,
    title,
    description,
    starts_at,
    ends_at,
    occurrence_starts_at_local,
    occurrence_ends_at_local,
    recurrence_timezone,
    recurrence_rule,
    created_at,
    updated_at
)
SELECT
    s.id,
    NULL,
    'unique_event'::event_type,
    'Schedule ' || s.id || ' - Event #' || event_no,
    NULL,
    timestamptz '2025-01-01 08:00:00+00'
        + ((event_no - 1) * interval '4 days'),
    timestamptz '2025-01-01 08:00:00+00'
        + ((event_no - 1) * interval '4 days')
        + interval '90 minutes',
    NULL,
    NULL,
    NULL,
    NULL,
    now(),
    now()
FROM schedules AS s
CROSS JOIN generate_series(
    1,
    :events_per_schedule
) AS event_no;

COMMIT;

-- ============================================================================
-- Planner statistics
-- ============================================================================

ANALYZE users;
ANALYZE organizations;
ANALYZE organization_memberships;
ANALYZE schedules;
ANALYZE events;

-- ============================================================================
-- Sanity checks
-- ============================================================================

SELECT count(*) AS users
FROM users;

SELECT count(*) AS organizations
FROM organizations;

SELECT count(*) AS memberships
FROM organization_memberships;

SELECT count(*) AS schedules
FROM schedules;

SELECT count(*) AS events
FROM events;

SELECT
    user_id,
    count(*) AS organization_count
FROM organization_memberships
WHERE user_id = :benchmark_user_id
GROUP BY user_id;

-- Show the actual organizations selected for the benchmark user.
SELECT organization_id
FROM organization_memberships
WHERE user_id = :benchmark_user_id
ORDER BY organization_id;

-- ============================================================================
-- Dashboard benchmark
-- ============================================================================
--
-- Query path:
--
-- user
--   -> organization_memberships
--   -> schedules
--   -> events
--
-- No explicit organizations JOIN is required:
-- organization_memberships.organization_id and schedules.organization_id are
-- sufficient to traverse the V1 access model.
--
-- Event overlap semantics:
--
--   event.starts_at < window_end
--   AND
--   event.ends_at > window_start
--
-- This uses half-open interval semantics [start, end).

EXPLAIN (ANALYZE, BUFFERS, VERBOSE, SETTINGS)
SELECT
    e.id,
    e.schedule_id,
    e.title,
    e.starts_at,
    e.ends_at
FROM organization_memberships AS om
JOIN schedules AS s
    ON s.organization_id = om.organization_id
JOIN events AS e
    ON e.schedule_id = s.id
WHERE om.user_id = :benchmark_user_id
  AND e.type = 'unique_event'
  AND e.starts_at < :window_end::timestamptz
  AND e.ends_at > :window_start::timestamptz
ORDER BY e.starts_at, e.id;

-- ============================================================================
-- Count-only benchmark
-- ============================================================================
--
-- Separates lookup/join/filter cost from row materialization and sorting cost.

EXPLAIN (ANALYZE, BUFFERS, VERBOSE, SETTINGS)
SELECT count(*)
FROM organization_memberships AS om
JOIN schedules AS s
    ON s.organization_id = om.organization_id
JOIN events AS e
    ON e.schedule_id = s.id
WHERE om.user_id = :benchmark_user_id
  AND e.type = 'unique_event'
  AND e.starts_at < :window_end::timestamptz
  AND e.ends_at > :window_start::timestamptz;

-- ============================================================================
-- Useful storage diagnostics
-- ============================================================================

SELECT
    pg_size_pretty(pg_relation_size('events')) AS events_heap,
    pg_size_pretty(pg_indexes_size('events')) AS events_indexes,
    pg_size_pretty(pg_total_relation_size('events')) AS events_total;

SELECT
    pg_size_pretty(pg_total_relation_size('users')) AS users_total,
    pg_size_pretty(pg_total_relation_size('organizations')) AS organizations_total,
    pg_size_pretty(pg_total_relation_size('organization_memberships')) AS memberships_total,
    pg_size_pretty(pg_total_relation_size('schedules')) AS schedules_total;

\set ON_ERROR_STOP on
\timing on

BEGIN;

-- Benchmark dataset:
-- 1 user
-- 1 organization
-- 1,000 schedules
-- 1,000 unique events per schedule
-- 1,000,000 events total
--
-- Each schedule uses the same temporal distribution so that querying any
-- schedule exercises the same data shape.
-- Events start every 6 hours from 2025-01-01 UTC and last 60 minutes.

TRUNCATE TABLE events, schedules, organizations, users RESTART IDENTITY CASCADE;

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
VALUES (
    'bench_user_001',
    'bench@example.com',
    'Bench',
    'User',
    'bench_user',
    '{}'::jsonb,
    now(),
    now()
)
RETURNING id \gset bench_user_

INSERT INTO organizations (
    name,
    description,
    created_by_user_id,
    settings,
    created_at,
    updated_at
)
VALUES (
    'Benchmark Organization',
    'Synthetic organization for PostgreSQL benchmarks',
    :bench_user_id,
    '{}'::jsonb,
    now(),
    now()
)
RETURNING id \gset bench_org_

-- Create 1,000 schedules and let PostgreSQL assign their IDs.
INSERT INTO schedules (
    organization_id,
    name,
    description,
    settings,
    created_at,
    updated_at
)
SELECT
    :bench_org_id,
    'Benchmark Schedule #' || schedule_no,
    'Synthetic schedule containing 1,000 unique events',
    '{}'::jsonb,
    now(),
    now()
FROM generate_series(1, 1000) AS schedule_no;

-- Create 1,000 events for every schedule = 1,000,000 events total.
--
-- CROSS JOIN deliberately produces:
--   1,000 schedules × 1,000 event numbers
--
-- Event #1 starts at 2025-01-01 00:00 UTC.
-- Subsequent events start every 6 hours.
-- Each event lasts 60 minutes.
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
    'unique_event',
    'Schedule ' || s.id || ' - Event #' || event_no,
    NULL,
    timestamptz '2025-01-01 00:00:00+00'
        + ((event_no - 1) * interval '6 hours'),
    timestamptz '2025-01-01 00:00:00+00'
        + ((event_no - 1) * interval '6 hours')
        + interval '60 minutes',
    NULL,
    NULL,
    NULL,
    NULL,
    now(),
    now()
FROM schedules AS s
CROSS JOIN generate_series(1, 1000) AS event_no;

COMMIT;

ANALYZE users;
ANALYZE organizations;
ANALYZE schedules;
ANALYZE events;

-- Sanity checks.
SELECT count(*) AS schedule_count
FROM schedules;

SELECT count(*) AS event_count
FROM events;

SELECT
    schedule_id,
    count(*) AS event_count,
    min(starts_at) AS first_event,
    max(starts_at) AS last_event
FROM events
WHERE schedule_id IN (1, 500, 1000)
GROUP BY schedule_id
ORDER BY schedule_id;

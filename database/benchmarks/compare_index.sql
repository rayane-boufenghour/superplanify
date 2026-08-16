\set ON_ERROR_STOP on

DROP INDEX IF EXISTS ix_events_schedule_id_starts_at;

ANALYZE events;

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    id,
    schedule_id,
    title,
    starts_at,
    ends_at
FROM events
WHERE schedule_id = 1
  AND starts_at < '2025-08-18 00:00:00+00'
  AND ends_at > '2025-08-11 00:00:00+00'
  AND type = 'unique_event';


CREATE INDEX ix_events_schedule_id_starts_at
    ON events (schedule_id, starts_at);

ANALYZE events;

EXPLAIN (ANALYZE, BUFFERS)
SELECT
    id,
    schedule_id,
    title,
    starts_at,
    ends_at
FROM events
WHERE schedule_id = 1
  AND starts_at < '2025-08-18 00:00:00+00'
  AND ends_at > '2025-08-11 00:00:00+00'
  AND type = 'unique_event';
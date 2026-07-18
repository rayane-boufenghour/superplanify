# Event

An event is defined by :

* a schedule;
* a start date and time;
* an end date and time;
* assigned participants;
* a type (recurring event or unique event).

Events are stored as absolute instants and displayed according to the relevant timezone.

## Unique and recurring events

The `events.type` column determines the temporal representation of an event.

### Unique event

For `unique_event`:

* `starts_at` is required;
* `ends_at` is required;
* `ends_at` must be greater than `starts_at`;
* all recurrence columns must be null.

A unique event represents two absolute instants.

### Recurring event

For `recurring_event`:

* `starts_at` must be null;
* `ends_at` must be null;
* `recurrence_starts_at_local` is required;
* `recurrence_ends_at_local` is required;
* `recurrence_ends_at_local` must be greater than `recurrence_starts_at_local`;
* `recurrence_timezone` is required;
* `recurrence_rule` is required.

The local start and end values describe the wall-clock time of one theoretical occurrence in the timezone of the series.

Example:

```text
recurrence_starts_at_local = 2026-01-01 09:00
recurrence_ends_at_local   = 2026-12-31 11:00
recurrence_timezone        = Europe/Paris
```

This means that each generated occurrence starts at 09:00 and ends at 11:00 in Paris local time, during 2026.

The duration is derived from the local start and end values rather than stored separately.

For occurrences crossing daylight-saving transitions, the local start and local end remain authoritative. Conversion to UTC is performed only after generating an occurrence in its IANA timezone.

## Business Rules

* An event must belong to a schedule.
* An event must have a start time and an end time.
* The end time must be after the start time.
* Published events are visible to authorized members.
* Pending or unapproved changes must not pollute the official schedule.
* In the first milestone, all members of the organization are participants.
* An event should not be modified after its end, except changes which are not time-related, such as fixing a title.
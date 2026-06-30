# Time Slot

A time slot represents a planned period of time within a schedule.

A time slot typically has:

* a start date and time;
* an end date and time;
* a title or description;
* assigned participants;
* optional contextual information.

Time slots are stored as absolute instants and displayed according to the relevant timezone.

## Business Rules

* A time slot must belong to a schedule.
* A time slot must have a start time and an end time.
* The end time must be after the start time.
* Published time slots are visible to authorized members.
* Pending or unapproved changes must not pollute the official schedule.
# Schedule

A schedule represents a structured collection of events managed by an organization.

A schedule belongs to one organization.

Examples:

* university class schedule;
* driving lesson schedule;
* sports training schedule;
* employee shift schedule.

A schedule is the main object users consult to understand what is planned.

## Business Rules

* A schedule belongs to exactly one organization.
* A schedule may define a timezone.
* A schedule is displayed using the organization timezone by default, unless it defines its own timezone.
* Only authorized members should be able to access a schedule.
* In Version 1, schedules are managed by organization administrators.
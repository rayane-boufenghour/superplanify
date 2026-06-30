# User

A user represents an individual person using SuperPlanify.

A user can:

* sign in to the application;
* belong to one or more organizations;
* access schedules they are allowed to view;
* create organizations;
* receive notifications;
* configure personal preferences.

A user may define a preferred timezone used to display schedule information.

A user is authenticated using Clerk, but is tied to a local database ID to handle business logic (see ADR-0004 in Auth).

## Notes

The user's preferred timezone does not change the official schedule. It only affects how dates and times are displayed to that user.
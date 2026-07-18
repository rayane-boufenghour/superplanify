# Activity

An `activity` is a reusable organization-level template.

It contains:

* a title;
* an optional description;
* optional custom-field values.

An event may reference the activity from which it was created through `events.source_activity_id`.

Creating an event from an activity copies the activity’s current title, description and custom-field values into the event.

* Changing an activity does not triggers updates on previously created events which references it, unless the client wants to.
* Deleting an activity does not delete events which references it.

Deletion of an activity sets `source_activity_id` to null.
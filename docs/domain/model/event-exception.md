# Event exceptions

An event exception may only reference a `recurring_event`.

`event_exceptions.original_occurrence_local` identifies the theoretical occurrence before any modification.

This value is expressed in the recurring event’s IANA timezone and never changes when the occurrence is moved.

### Cancelled exception

For `cancelled`:

* replacement start and end must be null;
* replacement title and description should normally be null;
* no event is generated for the targeted occurrence.

### Modified exception

For `modified`:

* replacement temporal fields may override the original start and end;
* replacement title may override the event title;
* replacement description may override the event description;
* custom-field overrides may be applied.

The final occurrence is obtained from:

```text
recurring event values
+ native exception overrides
+ custom-field overrides
```

The application must distinguish absence of an override from explicit removal of a custom-field value.

Past exceptions should be read-only.
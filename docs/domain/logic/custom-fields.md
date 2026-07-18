# Custom-field definitions

Custom fields are defined at organization level. They can be added to an Activity or an Event.

A homogeneous, versioned JSON convention must be used.

`organization_custom_fields.definition` contains the type and all type-specific configuration.

Option identifiers must remain stable even when display labels change.

The application must validate every stored value against the current field definition.

Changing a custom-field definition may require an impact analysis when existing values would become invalid.

## Custom-field values

Custom-field values use JSONB regardless of their declared type.

Examples:

```json
"Room 204"
```

```json
1002
```

```json
true
```

```json
"2027-08-15"
```

The JSON value itself must match the type declared in the custom-field definition.

The following relationships must always remain within the same organization:

* an activity and its custom fields;
* an event and its custom fields;
* an event exception and its custom fields.

These cross-table organization constraints cannot be fully represented by the current simple foreign keys. They must initially be enforced by the application service and covered by integration tests.

## Exception custom-field overrides

An exception custom-field override supports two operations.

### Set

```text
operation = set
value     = required
```

The exception replaces the value inherited from the recurring event.

### Remove

```text
operation = remove
value     = null
```

The exception explicitly removes the value inherited from the recurring event.

No override row means that the occurrence inherits the event value unchanged.
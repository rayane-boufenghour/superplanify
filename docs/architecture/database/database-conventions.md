# Database conventions

## Auth

Clerk subjects are used to map Clerk identities to application business data.

Because user profile information is synchronized through webhooks, temporary inconsistencies may occur. For example, a username or email address may have been updated in Clerk but not yet reflected in the local database.

These inconsistencies are not security-critical. Authentication relies exclusively on the Clerk subject contained in the authenticated session, which is then mapped to the application's internal user ID for all business logic.

Consequently, profile attributes stored in the local database (such as username, first name, last name, and email) should be considered cached copies of Clerk's data. They are intended for querying, searching, and display, and may temporarily lag behind the identity provider.

## PostgreSQL enums

PostgreSQL enums are appropriate for small, stable vocabularies whose values are controlled by the application and are unlikely to change frequently.

They are used for:

* event type;
* exception type;
* custom-field override operation;
* invitation status;
* membership roles.

Enums should not be used for configurable business data such as custom-field types or select-field options.

Adding an enum value is straightforward, but renaming or removing one is more operationally delicate. For that reason, enum values should use stable technical names rather than user-facing labels.

Example:

```text
recurring_event
```

rather than:

```text
Recurring event
```

Fine-grained RBAC may eventually outgrow the `organization_membership_role` enum. At that point, roles and permissions may move into relational tables.

## Required database constraints

The DBML schema does not express every required PostgreSQL check constraint.

Migrations must add constraints covering at least:

* valid column combinations for unique and recurring events;
* positive event durations;
* replacement-field consistency for exceptions;
* `set` overrides requiring a value;
* `remove` overrides forbidding a value;
* exceptions referencing only recurring events;
* organization consistency between events, activities and custom fields.

Constraints that require inspecting another table may require triggers or application-level enforcement.

## Naming conventions

Tables use plural snake_case names.

Foreign-key columns use the singular referenced entity followed by `_id`.

Examples:

```text
organization_id
schedule_id
event_id
```

Timestamp conventions:

* absolute instants use `timestamptz`;
* recurrence wall-clock values use `timestamp`;
* date-only recurrence boundaries use ISO dates inside the recurrence-rule document.

All `created_at` and `updated_at` values are generated server-side.

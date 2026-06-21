# ADR-0004 — Use a Local User Identifier for Business Relationships

## Status

Accepted

## Context

The application stores business data such as:

* organizations
* memberships
* schedules
* time slots
* permissions
* invitations

All these entities must be linked to users.

Clerk already provides a globally unique user identifier (`clerk_id`), which could theoretically be used directly as a foreign key throughout the database.

Two approaches were considered:

1. Use `clerk_id` everywhere.
2. Introduce a local numeric user identifier and use it for all business relationships.

The application must remain independent from authentication implementation details and should be able to evolve its data model without coupling every business table to Clerk.

## Decision

Introduce a local user identifier.

The local user model is:

```text id="m2e9n7"
users
├── id (BIGINT)
├── clerk_id (UNIQUE)
├── email
├── username
└── ...
```

All business tables reference:

```text id="4g1x1g"
users.id
```

and never:

```text id="fbz6h4"
users.clerk_id
```

The authentication layer is responsible for resolving:

```text id="mf6h7r"
clerk_id
↓
local_user_id
```

before business logic executes.

Business services only use the local identifier.

## Consequences

### Positive

* Business data is decoupled from Clerk.
* Foreign keys remain compact and efficient.
* Joins are simpler and faster.
* Authentication concerns remain isolated.
* Future identity-provider migrations become easier.
* Business services operate on application concepts rather than authentication concepts.

### Negative

* User resolution is required during authentication.
* A mapping between `clerk_id` and `local_user_id` must be maintained.
* Additional synchronization logic is needed when a user is created.

## Alternatives Considered

### Use Clerk IDs Everywhere

Rejected.

This would tightly couple the entire database schema to Clerk.

Examples:

```text id="k9o0tw"
organizations.owner_clerk_id
memberships.user_clerk_id
permissions.user_clerk_id
schedules.created_by_clerk_id
```

This approach would:

* leak authentication concerns into business tables
* make future migrations more difficult
* increase coupling between the domain model and the identity provider

### Use Email as the Primary Relationship Key

Rejected.

Email addresses can change.

They are user attributes, not stable identifiers.

Business relationships should rely on immutable identifiers.

## Notes

The architecture intentionally separates:

```text id="fkl5t8"
Authentication Identity
        ↓
      clerk_id

Application Identity
        ↓
    local_user_id
```

The authentication layer translates between the two.

The business layer only knows about local user identifiers.

## Related ADRs

* ADR-0001 — Use Clerk as the Identity Provider
* ADR-0003 — Store a Minimal Local User Profile Snapshot
* ADR-0005 — Use Redis for User Resolution Cache
* ADR-0006 — Use Webhooks with Lazy User Provisioning Fallback

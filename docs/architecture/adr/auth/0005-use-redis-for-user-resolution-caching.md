# ADR-0005 — User Resolution Strategy
## Status

Accepted

## Context

Every authenticated request contains a Clerk user identifier (clerk_id) extracted from a validated JWT.

The business layer operates exclusively on the local user identifier (users.id).

As a result, the authentication layer must resolve:

clerk_id
↓
local_user_id

This lookup occurs after JWT validation and before entering the business layer.

At the current stage of the project, no performance measurements indicate that this lookup is a bottleneck.

A properly indexed PostgreSQL table is expected to handle this query efficiently for the anticipated workload.

## Decision

User resolution is performed directly through PostgreSQL.

JWT validated
↓
Extract clerk_id
↓
PostgreSQL lookup
↓
local_user_id

PostgreSQL is the source of truth for the mapping between clerk_id and local_user_id.

No distributed cache is introduced at this stage.

## Rationale

A cache is an optimization, not a functional requirement.

Introducing Redis today would add operational complexity (deployment, monitoring, cache invalidation, failure modes) without evidence that the additional complexity is justified.

The architecture should remain as simple as possible until real performance measurements demonstrate a need for caching.

## Future Considerations

Redis may be introduced later if all of the following conditions are met:

- the lookup becomes a measurable performance bottleneck;
- the workload consists primarily of repeated read operations;
- PostgreSQL indexing and query optimization are no longer sufficient;
- profiling demonstrates that caching provides a meaningful benefit;
- cache invalidation can be implemented safely.

If introduced, Redis will remain an optimization layer.

The application must continue to function correctly when Redis is unavailable.

PostgreSQL will remain the source of truth.

## Consequences
### Positive
- Simpler architecture.
- Fewer infrastructure dependencies.
- Easier local development.
- No cache invalidation concerns.
- Premature optimization is avoided.

### Negative
- Every authenticated request performs a PostgreSQL lookup.
- If this lookup becomes a bottleneck in the future, caching may become necessary.

## Alternatives Considered
### Use Redis for User Resolution

Deferred.

Redis is a valid optimization for frequently repeated lookups, but there is currently no evidence that this optimization is required.

The decision will be revisited if production measurements justify the additional complexity.

### Store User Resolution in Application Memory

Rejected.

In-memory caches do not survive restarts, are not shared across instances, and complicate horizontal scaling.

If a distributed cache becomes necessary, Redis is a more appropriate choice.

### Use Redis as the Source of Truth

Rejected.

Redis is an optimization layer only.

The authoritative mapping must remain in PostgreSQL.

## Notes

The lookup is intentionally limited to:

clerk_id
↓
local_user_id

Redis is not considered for:

- JWT validation
- JWKS storage
- user profile synchronization
- authorization decisions

JWT validation continues to rely on the ASP.NET authentication stack and JWKS caching mechanisms.

## Related ADRs
ADR-0002 — Validate JWTs Locally Using Clerk JWKS
ADR-0004 — Use a Local User Identifier for Business Relationships
ADR-0006 — Use Webhooks with Lazy User Provisioning Fallback
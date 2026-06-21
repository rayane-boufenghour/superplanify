# ADR-0005 — Use Redis for User Resolution Caching

## Status

Accepted

## Context

Every authenticated request contains a Clerk user identifier (`clerk_id`) extracted from a validated JWT.

The business layer operates exclusively on the local user identifier (`users.id`).

As a result, the authentication layer must resolve:

```text
clerk_id
↓
local_user_id
```

A naive implementation would query PostgreSQL on every request.

As the number of requests increases, this would create unnecessary database load for a lookup that changes very rarely.

The system requires a mechanism to accelerate user resolution while preserving correctness.

## Decision

Use Redis as a cache for user resolution.

Redis stores the mapping:

```text
user:{clerk_id} -> local_user_id
```

Authentication flow:

```text
JWT validated
↓
Extract clerk_id
↓
Redis lookup
├─ HIT  → local_user_id
└─ MISS
       ↓
       Resolve through PostgreSQL
       ↓
       Populate Redis
       ↓
       local_user_id
```

Redis is a performance optimization only.

PostgreSQL remains the source of truth.

The application must continue to operate correctly if Redis is unavailable.

## Consequences

### Positive

* Reduces PostgreSQL load.
* Faster authenticated requests.
* Eliminates repetitive user resolution queries.
* Improves scalability.
* Keeps authentication latency predictable.

### Negative

* Additional infrastructure component.
* Cache invalidation must be handled correctly.
* Slight increase in operational complexity.
* Cold cache requests still require database access.

## Alternatives Considered

### Resolve Users Through PostgreSQL Only

Rejected.

This would require a database lookup for every authenticated request.

While technically correct, it would create unnecessary load on PostgreSQL for data that rarely changes.

### Store User Resolution in Application Memory

Rejected.

Application memory caches:

* do not survive restarts
* do not work across multiple API instances
* complicate horizontal scaling

A distributed cache provides more predictable behavior.

### Use Redis as the Source of Truth

Rejected.

Redis is an optimization layer.

The authoritative user mapping must remain in PostgreSQL.

Losing Redis data must not affect correctness.

## Notes

Redis is intentionally limited to:

```text
clerk_id
↓
local_user_id
```

It is not used for:

```text
- JWT validation
- JWKS storage
- user profile synchronization
- authorization decisions
```

JWT validation relies on the ASP.NET authentication stack and JWKS caching mechanisms.

Redis only accelerates user identity resolution after authentication has already succeeded.

## Related ADRs

* ADR-0002 — Validate JWTs Locally Using Clerk JWKS
* ADR-0004 — Use a Local User Identifier for Business Relationships
* ADR-0006 — Use Webhooks with Lazy User Provisioning Fallback

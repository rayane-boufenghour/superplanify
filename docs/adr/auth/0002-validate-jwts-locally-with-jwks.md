# ADR-0002 — Validate JWTs Locally Using Clerk JWKS

## Status

Accepted

## Context

The backend API must authenticate every incoming request.

Several validation strategies were considered:

* Call Clerk APIs on each request.
* Store a static public key locally.
* Validate JWTs locally using Clerk's JWKS endpoint.

The application must remain stateless and should not depend on Clerk's availability during normal request processing.

The solution must also support signing key rotation without requiring manual intervention.

## Decision

Validate JWTs locally using Clerk's JWKS endpoint.

The ASP.NET Core authentication middleware is responsible for:

* retrieving public signing keys from Clerk's JWKS endpoint
* caching JWKS data in memory
* validating JWT signatures
* validating issuer claims
* validating expiration claims
* validating not-before claims
* validating audience claims when required

The application does not contact Clerk during normal request processing.

Redis is not used for JWKS storage or caching.

JWKS caching and refresh logic are delegated to the ASP.NET authentication stack.

## Consequences

### Positive

* No network call to Clerk during request processing.
* Lower request latency.
* Reduced external dependencies.
* Better resilience during temporary Clerk outages.
* Automatic support for signing key rotation.
* Standard JWT validation architecture.
* Simpler operational maintenance.

### Negative

* Initial configuration is more complex than using a static public key.
* JWT validation depends on proper JWKS cache management.
* Understanding JWKS behavior requires additional knowledge compared to a fixed public key.

## Alternatives Considered

### Validate JWTs Through Clerk APIs

Rejected.

Every authenticated request would depend on Clerk's availability and network latency.

This approach would:

* increase response times
* introduce an external runtime dependency
* reduce system resilience

Authentication should continue to work even if Clerk is temporarily unreachable.

### Use a Static Public Key

Rejected.

A static public key would simplify the initial implementation but creates operational risks when signing keys rotate.

This approach would require:

* manual updates
* redeployments
* operational monitoring of key changes

The architecture should support key rotation automatically.

### Store JWKS in Redis

Rejected.

JWKS data is authentication infrastructure, not application data.

ASP.NET Core already provides built-in mechanisms for:

* JWKS retrieval
* caching
* refresh
* key rotation handling

Adding Redis would introduce unnecessary complexity without providing significant benefits.

## Notes

JWT validation is performed locally, but the backend still relies on Clerk as the source of signing keys.

The architecture therefore follows this principle:

```text
Authentication request
        ↓
Local JWT validation
        ↓
Cached Clerk JWKS
        ↓
Authenticated user context
```

Normal request processing never requires a call to Clerk.

## Related ADRs

* ADR-0001 — Use Clerk as the Identity Provider
* ADR-0003 — Store Profile Data in JWT Claims
* ADR-0006 — Use Webhooks with Lazy User Provisioning Fallback

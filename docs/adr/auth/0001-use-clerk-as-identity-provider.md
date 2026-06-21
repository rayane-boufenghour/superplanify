# ADR-0001 — Use Clerk as the Identity Provider

## Status

Accepted

## Context

The application needs an external identity provider to handle user authentication, session management, sign-up, sign-in, and user identity.

Auth0 was initially considered and tested. However, several issues created friction during integration.

The main issue was related to JWT/session refresh behavior. After user registration, Auth0 provided a JWT that was not refreshed as expected, and there was no straightforward way to force a refresh from the application. This created UX friction, especially when the frontend needed fresh user/session data immediately after sign-up.

Another issue was the hosted authentication experience. User actions redirected to Auth0-hosted pages with unattractive development tenant names such as `dev-...`, which made the experience feel less polished and harder to control from a product perspective.

For this project, authentication should not only be secure. It should also provide a clean developer experience and a smooth user experience.

## Decision

Use Clerk as the identity provider instead of Auth0.

Clerk will be responsible for:

* user sign-up
* user sign-in
* session management
* JWT issuance
* user lifecycle events through webhooks
* profile/session claims

The backend will trust Clerk-issued JWTs after local validation.

The application will not implement its own authentication system.

## Consequences

### Positive

* Better frontend integration experience.
* Smoother sign-up and sign-in flows.
* Better control over the perceived UX/UI.
* Cleaner session behavior for this project’s needs.
* Easier JWT customization through session claims.
* Useful webhook support for user lifecycle events.
* Reduced authentication implementation complexity.

### Negative

* Strong dependency on Clerk as a third-party provider.
* Future migration away from Clerk would require changes to authentication, webhooks, JWT validation, and user provisioning.
* Some behavior depends on Clerk-specific concepts and APIs.

## Alternatives Considered

### Use Auth0

Rejected.

Auth0 is a mature identity provider, but the tested integration introduced UX and session management friction.

The main blockers were:

* JWT/session data not refreshing as needed after sign-up.
* No simple way to force the required refresh from the application.
* Hosted authentication pages using unattractive development tenant names.
* Less pleasant product and developer experience for this specific project.

### Build Custom Authentication

Rejected.

A custom authentication system would increase security risk, implementation time, and maintenance cost.

Authentication is not the core business value of the application.

## Related ADRs

* ADR-0002 — Validate JWTs Locally with JWKS
* ADR-0003 — Store Profile Data in JWT Claims
* ADR-0006 — Use Webhooks with Lazy User Provisioning Fallback

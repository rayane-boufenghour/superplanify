# Authentication Architecture Decision Records

## Purpose

This directory contains the Architecture Decision Records (ADRs) related to authentication, identity management, user synchronization, caching, and account lifecycle.

The goal of these ADRs is to document important architectural decisions, their context, alternatives, and consequences.

Each ADR focuses on a single decision.

---

## Reading Order

The ADRs are intended to be read in the following order:

| ADR      | Title                                                  |
| -------- | ------------------------------------------------------ |
| ADR-0001 | Use Clerk as the Identity Provider                     |
| ADR-0002 | Validate JWTs Locally Using Clerk JWKS                 |
| ADR-0003 | Store a Minimal Local User Profile Snapshot            |
| ADR-0004 | Use a Local User Identifier for Business Relationships |
| ADR-0005 | Use Redis for User Resolution Caching                  |
| ADR-0006 | Use Webhooks with Lazy User Provisioning Fallback      |
| ADR-0007 | Use Hard Delete for User-Owned Business Data           |

---

## High-Level Architecture

The application uses Clerk as the source of truth for identity and authentication.

JWTs are validated locally using Clerk's JWKS endpoint.

The application maintains a local user model because business entities such as organizations, memberships, schedules, and permissions require stable local relationships.

Redis is used as a performance optimization for user resolution.

PostgreSQL remains the source of truth for application data.

---

## Architectural Principles

### Clerk Owns Authentication

The application does not manage:

* passwords
* authentication flows
* session management
* account recovery
* identity verification

These responsibilities belong to Clerk.

---

### PostgreSQL Owns Business Data

The application owns:

* organizations
* memberships
* schedules
* permissions
* invitations
* local users

Business logic never depends directly on Clerk APIs during normal request processing.

---

### Authentication Must Remain Stateless

Every request contains a JWT.

The backend validates the token locally and reconstructs the current user context from:

```text
JWT
↓
clerk_id
↓
local_user_id
```

No server-side session state is required.

---

### Webhooks Improve Consistency

Clerk webhooks are the primary synchronization mechanism for local users.

However, authentication must remain functional even if synchronization is delayed.

For this reason, the system combines:

```text
Webhook synchronization
+
Lazy provisioning fallback
```

This guarantees that authenticated users can always access the application.

---

### Redis Improves Performance

Redis is used exclusively as a cache.

Redis is never a source of truth.

The application must continue to operate correctly when Redis is unavailable.

---

### Simplicity Over Premature Optimization

The current architecture reflects the requirements of the first product version.

Features that are intentionally deferred include:

* ownership transfer
* billing retention policies
* advanced audit trails
* soft deletion strategies
* multi-provider authentication

These decisions will be revisited only when supported by actual product requirements.

---

## Future ADR Candidates

The following topics may require dedicated ADRs in the future:

* Stripe billing integration
* Billing retention policies
* Ownership transfer workflows
* Organization lifecycle management
* Role-based access control (RBAC)
* Notification architecture
* Event-driven integrations

---

## Philosophy

The purpose of these ADRs is not to predict every future requirement.

The purpose is to document the reasoning behind decisions that are expensive to change and important to understand.

Future requirements may supersede existing ADRs.

When that happens, a new ADR should be created rather than modifying historical decisions.

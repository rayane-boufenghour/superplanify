# ADR-0003 — Store a Minimal Local User Profile Snapshot

## Status

Accepted

## Context

The application supports collaboration features.

Users can create organizations, invite other users, manage memberships, and assign permissions.

The backend cannot rely only on the current user's JWT claims because collaboration workflows often involve other users.

Examples:

* invite a user by email
* search an existing user by username
* display organization members
* prevent duplicate invitations
* manage permissions for existing members

JWT claims are useful for the authenticated user, but they are not enough for querying or identifying other users.

## Decision

Store a minimal user profile snapshot in the local PostgreSQL database.

The local `users` table stores:

```text
id
clerk_id
email
username
first_name
last_name
created_at
updated_at
```

`clerk_id` remains the external identity reference.

`id` remains the internal application identifier.

`email` and `username` are stored locally because they are required by collaboration and invitation workflows.

Clerk remains the source of truth for user identity.

The local database stores only the profile fields needed by the application.

## Consequences

### Positive

* Users can be invited by email.
* Users can be searched or resolved by username.
* Organization members can be displayed without calling Clerk.
* Permission management can work with local database queries.
* The backend can support collaboration workflows properly.

### Negative

* User profile synchronization is now required.
* Clerk `user.updated` webhooks must update the local snapshot.
* Local data may become temporarily stale.
* The database model is slightly larger.
* Email and username changes must be handled carefully.

## Alternatives Considered

### Store Profile Data Only in JWT Claims

Rejected.

This works for the current authenticated user, but not for workflows involving other users.

The backend needs queryable profile data for invitations, memberships, and permissions.

### Query Clerk When Profile Data Is Needed

Rejected.

This would introduce unnecessary external API calls and make collaboration workflows dependent on Clerk availability during normal application usage.

### Store Full User Profiles Locally

Rejected.

The application does not need to replicate all Clerk user data.

Only the fields required by product workflows should be stored locally.

## Related ADRs

* ADR-0001 — Use Clerk as the Identity Provider
* ADR-0002 — Validate JWTs Locally Using Clerk JWKS
* ADR-0004 — Use a Local User Identifier for Business Relationships
* ADR-0006 — Use Webhooks with Lazy User Provisioning Fallback

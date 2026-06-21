# ADR-0006 — Use Webhooks with Lazy User Provisioning Fallback

## Status

Accepted

## Context

The application maintains a local user table for business relationships.

A local user record is required because:

* organizations reference local users
* memberships reference local users
* permissions reference local users
* invitations may target existing users

Clerk provides webhook events that can be used to synchronize users proactively:

* `user.created`
* `user.updated`
* `user.deleted`

A webhook-only approach was initially considered.

However, webhook delivery is asynchronous by nature.

Even though Clerk supports retries and event replay, temporary delays may occur between:

```text
User creation in Clerk
↓
Webhook delivery
↓
Local user creation
```

Authentication must remain functional even if synchronization has not yet completed.

The system must also remain safe under concurrent requests.

## Decision

Use a hybrid synchronization strategy.

### Primary Synchronization Mechanism

Clerk webhooks are the primary mechanism used to synchronize local users.

The application processes:

* `user.created`
* `user.updated`
* `user.deleted`

Webhook handlers must be idempotent.

### Authentication Fallback

When an authenticated request is received, the application must verify that a local user exists.

Resolution strategy:

```text
SELECT user by clerk_id

If found:
    return local user

Else:

INSERT user
ON CONFLICT DO NOTHING
RETURNING id

If id returned:
    return local user

Else:

RESELECT user by clerk_id

Return local user
```

This fallback guarantees that a valid authenticated user can always obtain a local identity, even if synchronization has not yet occurred.

The `users.clerk_id` column is protected by a unique constraint.

```sql
UNIQUE(clerk_id)
```

## Consequences

### Positive

* Authentication does not depend on webhook delivery timing.
* User provisioning is resilient to delayed webhook processing.
* User provisioning is resilient to temporary webhook failures.
* Concurrent requests remain safe.
* Duplicate users cannot be created.
* The system remains operational even if synchronization is temporarily incomplete.
* Existing users do not trigger unnecessary writes.

### Negative

* User creation logic exists in both webhook handlers and authentication fallback logic.
* Cache misses may require additional database queries.
* The architecture is slightly more complex than a webhook-only solution.

## Alternatives Considered

### Webhook-Only Synchronization

Rejected.

Authentication would become dependent on successful webhook delivery.

A valid authenticated user could reach the application before synchronization completes.

This would introduce unnecessary coupling between authentication and asynchronous event processing.

### Insert-First Strategy

Example:

```sql
INSERT ...
ON CONFLICT DO NOTHING
RETURNING id
```

followed by a lookup if necessary.

Rejected.

Most authenticated requests involve existing users.

Starting with an insert would perform unnecessary write attempts for the common case.

The selected strategy optimizes for the expected workload:

```text
Existing user
↓
SELECT
↓
Return user
```

### Force User Creation During Sign-Up Only

Rejected.

This would make the application dependent on a specific user onboarding flow.

Authentication should remain self-sufficient and capable of recovering from synchronization gaps.

## Notes

The architecture intentionally separates:

```text
Synchronization
↓
Webhooks

Availability
↓
Authentication fallback
```

Webhooks provide the normal synchronization path.

The fallback mechanism provides operational resilience.

Together they ensure that local user provisioning is both efficient and reliable.

The lazy fallback creates missing users using JWT claims, but it does not update existing profile fields on every request. Profile updates are handled by Clerk webhooks.

## Related ADRs

* ADR-0001 — Use Clerk as the Identity Provider
* ADR-0003 — Store a Minimal Local User Profile Snapshot
* ADR-0004 — Use a Local User Identifier for Business Relationships
* ADR-0005 — Use Redis for User Resolution Caching
* ADR-0007 — Use Hard Delete for Business Data

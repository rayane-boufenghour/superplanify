# ADR-0007 — Use Hard Delete for User-Owned Business Data

## Status

Accepted

## Context

The application is a scheduling platform.

Users can:

* create organizations
* manage schedules
* create time slots
* invite members
* assign permissions

The system stores operational business data only.

The application does not currently require:

* audit trails
* regulatory retention
* legal record preservation
* historical account recovery
* compliance-driven data retention

When a user deletes their account through Clerk, the application must decide how to handle associated business data.

Two approaches were considered:

1. Soft delete
2. Hard delete

## Decision

Use hard deletion for business data.

Account deletion is initiated by the Clerk `user.deleted` webhook.

When a user is deleted:

```text
Delete memberships
↓
Delete invitations
↓
Delete permissions
↓
Delete owned organizations
↓
Delete schedules
↓
Delete time slots
↓
Delete local user
↓
Invalidate Redis cache
```

Deletion is performed within a database transaction.

The system assumes that organizations owned by a deleted user should also be removed.

Ownership transfer is not supported in the initial version of the application.

## Consequences

### Positive

* Simpler data model.
* No deleted-state management.
* No soft-delete filtering logic.
* Smaller database size.
* Easier maintenance.
* Clear and predictable lifecycle for user-owned data.
* Reduced implementation complexity.

### Negative

* Deleted data cannot be recovered.
* Organizations owned by deleted users are permanently removed.
* Future collaboration requirements may require ownership transfer mechanisms.
* Historical business data is lost when an account is removed.

## Alternatives Considered

### Soft Delete

Example:

```text
deleted_at
status = deleted
```

Rejected.

The application currently has no business requirement for retaining deleted accounts or business objects.

Soft deletion would introduce:

* additional query complexity
* filtering requirements
* lifecycle management rules
* restoration workflows

without solving a current business problem.

### Archive Deleted Users

Rejected.

The application does not currently require user history preservation.

Introducing archival mechanisms would increase operational complexity without providing immediate value.

## Notes

This decision applies only to business data managed by the application.

Authentication data remains managed by Clerk.

Future billing integrations may introduce separate retention requirements.

Such requirements should be evaluated independently and must not automatically change the business-data deletion policy.

## Related ADRs

* ADR-0001 — Use Clerk as the Identity Provider
* ADR-0003 — Store a Minimal Local User Profile Snapshot
* ADR-0006 — Use Webhooks with Lazy User Provisioning Fallback

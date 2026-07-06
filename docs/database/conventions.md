# Conventions

## Philosophy

SuperPlanify favors simplicity over premature optimization.

The relational model is the source of truth.
JSONB is used only for flexible metadata and configuration.

Database schema changes should prioritize readability and maintainability over reducing the number of tables.

---

## Naming conventions

### Tables

- plural nouns
- lowercase
- snake_case

Examples:

users
organizations
organization_memberships
schedules
timeslots

---

### Primary keys

Every table uses

id bigint

except junction tables which use composite keys.

---

### Foreign keys

Always named

<entity>_id

Examples

user_id
org_id
schedule_id

Never

id_user
idOrg
organization

---

### Timestamps

All timestamps use

timestamptz

Never use timestamp.

All timestamps are stored in UTC.

Timezone conversion happens in the application layer.

---

### JSONB

JSONB is reserved for:

- user preferences
- organization settings
- schedule settings
- optional metadata

Business entities must not be stored inside JSONB.

Prefer :

timeslots table

Over :

schedule.settings.timeslots[]

---

### Permissions

V1

Organization creator = administrator.

Organization members = read-only.

Schedule-specific permissions are intentionally omitted until RBAC is introduced.

---

### Relationships

Organizations own schedules.

Schedules own timeslots.

Organizations own memberships.

No entity is shared between organizations.

---

### Indexes

Create indexes for

- foreign keys
- common lookup fields
- frequently filtered timestamps

Avoid speculative indexes.

---

### Constraints

Use foreign keys whenever possible.

Prefer database constraints over application validation.

The database should reject invalid states.

---

### Migrations

Never modify an old migration.

Create a new migration for every schema change.

---

### Nullability

Fields should be NOT NULL unless there is a real business reason.

Avoid nullable booleans.

---

### IDs

IDs are internal implementation details.

Never expose predictable IDs publicly if a secret identifier is required.

---

### Email addresses

Emails are stored normalized (lowercase or CITEXT).

Email comparisons are case-insensitive.

---

### Performance

Do not denormalize without measurement.

Avoid premature optimization.

PostgreSQL handles joins efficiently.

Favor a clean relational model over reducing JOINs.

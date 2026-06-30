# Domain Model

## Purpose

Documents inside this folder describes the core domain concepts used by SuperPlanify.

It is not a database schema, an API contract, or an implementation guide. Its goal is to define the main business concepts, their responsibilities, and the rules that should guide future technical decisions.

SuperPlanify is a scheduling and coordination platform. The schedule is the central object, but the product also involves organizations, members, permissions, notifications, and eventually collaboration workflows.

---

## Initial Concept Map

```text
User
  └── Member of Organization

Organization
  ├── Members
  ├── Schedules
  ├── Invitations
  └── Timezone

Schedule
  └── Time Slots

Time Slot
  ├── Participants
  └── Published scheduling information

Future:
  ├── Groups
  ├── Activities
  ├── Approval Requests
  ├── Polls
  ├── Discussions
  └── Notifications
```

---

## Current Product Boundary

The first version of SuperPlanify focuses on:

* organizations;
* schedules;
* time slots;
* invitations;
* read-only member access.

Advanced roles, approval workflows, polls, discussions, real-time notifications, groups, and activity-level modeling are intentionally left for future milestones.
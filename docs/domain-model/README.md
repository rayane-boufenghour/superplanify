# Domain Model

## Purpose

Documents inside this folder describes the core domain concepts used by SuperPlanify.

It is not a database schema, an API contract, or an implementation guide. Its goal is to define the main business concepts, their responsibilities, and the rules that should guide future technical decisions.

SuperPlanify is a scheduling and coordination platform. The schedule is the central object, but the product also involves organizations, members, permissions, notifications, and eventually collaboration workflows.

## Possible Future Concepts

### Group

A group represents a collection of members.

Groups may be defined at different scopes:

* organization-level groups;
* schedule-level groups.

Examples:

* students;
* teachers;
* administration;
* sports team;
* driving group;
* exam supervisors.

Groups may later simplify schedule assignment, permissions, notifications, and approval workflows.

---

### Activity

An activity represents what happens during a time slot.

This concept may later be separated from the time slot itself.

For example:

* a time slot defines `Monday 13:00–14:00`;
* an activity defines `Driving theory lesson`.

This separation may support more advanced workflows, such as proposing different activities for the same time slot or applying permissions at a finer level.

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
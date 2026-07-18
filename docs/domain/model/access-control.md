# Access Control

Access control determines who can view, create, modify, or validate scheduling information.

## Version 1 Scope

The first version keeps access control simple:

* organization administrators can create and manage schedules;
* invited members can view schedules they are assigned to.

Organization membership determines access in V1.

## Future Direction

Later versions may introduce:

* organization-level roles;
* schedule-level permissions;
* event-level permissions;
* validators for schedule changes.

Event participation, when introduced, will describe which users are involved in an event. It must not automatically be treated as a permission system unless explicitly defined by the authorization rules.

Future RBAC may introduce schedule-level or activity-level visibility, but these rules should be added separately from participation modeling.
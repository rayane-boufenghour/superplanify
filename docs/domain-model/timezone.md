# Timezone

Timezone support is a foundational requirement.

SuperPlanify distinguishes between:

* the authoritative timezone of an organization;
* the preferred display timezone of a user;
* the absolute timestamps stored by the system.

## Business Rules

* Each organization must define an authoritative timezone.
* Each user may define a preferred display timezone.
* Schedule times are stored as absolute instants.
* The user interface displays schedule times using the most relevant timezone:

  1. user timezone, if explicitly configured;
  2. organization timezone;
  3. application default fallback.
# Timezone

Timezone support is a foundational requirement.

SuperPlanify distinguishes between:

* the authoritative timezone of an organization;
* the authoritative timezone of a schedule;
* the preferred display timezone of a user;
* the absolute timestamps stored by the system.

Timezone conversion is performed by the frontend.

The backend always exposes UTC timestamps through the API.

## Business Rules

* Each organization must define an authoritative timezone.
* Each schedule may define a timezone, which overrides its organization's timezone.
* Each user may define a preferred display timezone.
* Schedule times are stored as absolute instants.

## Display Priority

When displaying schedule times, SuperPlanify uses the following priority:

1. User timezone, if configured.
2. Organization timezone.
3. Schedule timezone, if configured.
4. Browser local timezone as frontend fallback.

## Design Decisions

- User, organization and schedule timezones are stored inside JSONB columns.
- User timezone is initialized during the first authenticated `/me` call when possible.
- The frontend sends the browser-detected IANA timezone to the backend.
- The backend validates the timezone using a .NET library.
- No timezone validation is performed directly in the database.
- No external API or custom timezone file is used for validation.

## Rationale

Timezone support is a foundational requirement for schedule accuracy.

The system should store time-related data consistently while allowing users to view schedules in the timezone that makes the most sense for them.
# SuperPlanify

SuperPlanify is a scheduling and coordination platform designed to help both individuals and organizations manage schedules from a single place.

Instead of relying on multiple websites, spreadsheets, messaging applications, and internal tools, SuperPlanify provides a unified experience for creating, publishing, consulting, and eventually collaborating around schedules.

The long-term vision is to make scheduling, communication, and decision-making part of the same workflow.

---

## Vision

SuperPlanify addresses a common problem faced by schools, universities, companies, sports clubs, driving schools, associations, and many other organizations:

* fragmented scheduling tools;
* poor communication around schedule changes;
* multiple platforms for the same information;
* informal planning processes.

The goal is to provide a single source of truth for scheduling while offering a modern and intuitive user experience.

---

## Current Status

The project is under active development.

The current focus is building a solid foundation before introducing advanced collaboration features.

Current milestones include:

* Organizations
* Schedules
* Time slots
* Member invitations
* Read-only member access

Future milestones will progressively introduce:

* Role-based access control
* Real-time notifications
* Polls and planning discussions
* Calendar integrations
* Smart scheduling and automation

---

## Repository Structure

```text
.
├── docs/          # Product, domain and architecture documentation
├── frontend/      # Next.js frontend
└── backend/       # ASP.NET Core API
```

---

## Documentation

The project documentation is organized into several areas.

### Product

Defines the product vision, roadmap, use cases, and functional scope.

```text
docs/product/
```

### Domain Model

Defines the core business concepts used throughout the project.

```text
docs/domain-model/
```

### Architecture Decision Records (ADR)

Documents important architectural decisions and the reasoning behind them.

```text
docs/adr/
```

---

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Clerk Authentication
* next-intl
* Cloudflare Workers (OpenNext)

### Backend

* ASP.NET Core
* PostgreSQL

---

## Development Philosophy

The project follows an iterative approach.

Each milestone delivers a coherent set of capabilities while preparing the architecture for future evolution without implementing unnecessary complexity too early.

The objective is to build a maintainable product driven by business rules rather than by individual features.

---

## License

This repository is currently provided for demonstration and development purposes.
Future licensing terms may change as the project evolves.

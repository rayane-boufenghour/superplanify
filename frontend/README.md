# SuperPlanify Frontend

Frontend application for SuperPlanify, built with Next.js.

## Tech Stack

* Next.js
* React
* TypeScript
* Tailwind CSS
* Clerk for authentication
* next-intl for internationalization
* pnpm as package manager

## Project Structure

```txt
frontend/
  app/                 # Next.js App Router pages and layouts
    [locale]/          # Localized routes
      app/             # Protected application area
      contact/         # Contact page
      pricing/         # Pricing page

  components/          # Reusable UI and page components
    app/               # Authenticated application layout components
    auth/              # Authentication-related components
    common/            # Shared components
    contact/           # Contact page components
    landing/           # Landing page components
    pricing/           # Pricing page components
    ui/                # Generic UI components

  i18n/                # next-intl routing and request configuration
  messages/            # Translation files
  public/              # Static assets
```

## Internationalization

The frontend currently supports:

* English
* French

The default locale is English.

Routes are handled with localized URLs using `next-intl`.

Examples:

```txt
/
 /fr
/pricing
/fr/pricing
/app
/fr/app
```

Translation files are located in:

```txt
messages/en.json
messages/fr.json
```

## Authentication

Authentication is handled with Clerk.

The protected application area is located under:

```txt
/app
/:locale/app
```

Routes under `/app` require authentication.

The middleware/proxy layer combines:

* Clerk route protection
* next-intl locale routing

## Available Scripts

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Build the application:

```bash
pnpm build
```

Start the production server locally:

```bash
pnpm start
```

Run linting:

```bash
pnpm lint
```

## Environment Variables

The frontend requires Clerk environment variables.

Expected variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

Additional variables may be added later when the backend API, billing, or production integrations are introduced.

## Development Notes

The frontend is currently focused on:

* landing page
* pricing page
* contact page
* authentication
* localized routing
* protected member area shell

The main product features are still being designed and implemented progressively.

Current protected sections include:

* Organizations
* Schedules
* Billing
* Settings

These pages are placeholders for the upcoming product workflows.

## Deployment

The frontend is deployed on **Cloudflare** using **OpenNext**.

### Production Build

Build the application for Cloudflare:

```bash
pnpm run cf-build
```

## Production Deployment

Deploy the latest build:

```bash
pnpm run cf-deploy
```

Alternatively, build and deploy in a single command:

```bash
pnpm run deploy
```

Deployment configuration is defined in:

```text
wrangler.jsonc
open-next.config.ts
```

Cloudflare manages the production infrastructure, while the application itself remains a standard Next.js project.

## Continuous Deployment

Pushes on the main branch targeting the frontend subdirectory triggers automatic deploy jobs on Cloudflare.


## Related Documentation

Product and domain documentation is located in the repository-level `docs/` directory.

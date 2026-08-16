# SuperPlanify database development

## Local PostgreSQL

From `docker/`:

```bash
docker compose up -d
```

Check readiness:

```bash
docker compose ps
```

Stop while keeping data:

```bash
docker compose down
```

Destroy the local database volume and start from scratch:

```bash
docker compose down -v
docker compose up -d
```

Enter the local database using the terminal:

```bash
docker compose exec postgres psql -U superplanify -d superplanify_dev
```

Apply a local script to the local database:

```bash
 docker compose exec -T postgres psql -U superplanify -d superplanify_dev < ../database/scripts/001_initial_schema.sql
 ```

## Connection string

For local ASP.NET Core development:

```text
Host=localhost;Port=5432;Database=superplanify_dev;Username=superplanify;Password=<local-password>
```

Do not commit the real password. Prefer ASP.NET Core User Secrets for local development and environment variables / a secret store outside development.

Good practice in development environment :

```
dotnet user-secrets init

dotnet user-secrets set \
  "ConnectionStrings:PostgreSQL" \
  "Host=localhost;Port=5432;Database=superplanify_dev;Username=superplanify;Password=..."
```

## Schema ownership

`001_initial_schema.sql` is a reviewed SQL reference for the initial V1 design.

Once the ASP.NET Core API uses Entity Framework Core migrations, migrations should become the executable history of the application schema. Do not independently evolve both handwritten SQL files and EF migrations as competing sources of truth.

Recommended workflow:

1. Model the change in EF Core.
2. Generate a migration.
3. Read the generated migration before applying it.
4. Apply it to a disposable local database.
5. Run integration tests.
6. Commit the migration together with the code requiring it.

Useful commands (run from the project containing the EF Core startup/configuration as appropriate):

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet ef migrations list
dotnet ef migrations script
```

For a disposable local database, prefer destroying/recreating the Docker volume and replaying all migrations rather than manually editing schema state.

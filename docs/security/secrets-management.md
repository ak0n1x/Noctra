# Secrets Management

OpenGuild uses environment variables for configuration and secrets. Real secret
files must not be committed.

## Example file

The root `.env.example` documents `DATABASE_URL`, `POSTGRES_PORT`, `API_PORT` and JWT settings with local development
values. Contributors may create an ignored root `.env` for their own environment.
Both NestJS and the Prisma scripts read that file; process environment variables
take precedence. The application does not automatically load `.env.example`.

## Database URL

`DATABASE_URL` tells Prisma how to connect to PostgreSQL and includes credentials.
The example `postgresql://openguild:openguild@localhost:5433/openguild?schema=public`
is only for a local development database. `pnpm db:up` provisions the database and
role in Docker on first start; the example file itself does not create them.

Use separate credentials per environment, restrict database access, and use TLS for
remote database connections. Never log the URL or include it in screenshots, error
reports or shared shell transcripts. `API_PORT` is configuration, not a secret.

## Rules

- Do not commit `.env`, production credentials or real user data.
- Keep `.env.example` updated using placeholders only.
- Use a secret manager or deployment environment for production secrets.
- Grant the runtime database role only the permissions it needs; migration roles
  may need additional permissions in development.
- JWT signing keys and future mail and storage credentials follow the same rules.
- Never expose backend secrets through `NEXT_PUBLIC_` variables.

If a secret is exposed, revoke or rotate it promptly and inspect its use. Deleting
it from the latest commit does not remove it from Git history or invalidate copies.
Follow the project's [security policy](../../SECURITY.md) when reporting exposure.

No real sensitive data is seeded. Authentication now requires `JWT_ACCESS_SECRET`;
the example placeholder is rejected at startup. Generate a separate random secret
for each environment and configure `JWT_ACCESS_EXPIRES_IN` (default `15m`).

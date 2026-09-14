# Secrets Management

OpenGuild uses environment variables for configuration and secrets. Real secret
files must not be committed.

## Example file

The root `.env.example` documents `DATABASE_URL` and `API_PORT` with local development
values. Contributors may create an ignored root `.env` for their own environment.
Both NestJS and the Prisma scripts read that file; process environment variables
take precedence. The application does not automatically load `.env.example`.

## Database URL

`DATABASE_URL` tells Prisma how to connect to PostgreSQL and includes credentials.
The example `postgresql://openguild:openguild@localhost:5432/openguild?schema=public`
is only for a local development database. Provision that database and role separately;
the example file does not create them.

Use separate credentials per environment, restrict database access, and use TLS for
remote database connections. Never log the URL or include it in screenshots, error
reports or shared shell transcripts. `API_PORT` is configuration, not a secret.

## Rules

- Do not commit `.env`, production credentials or real user data.
- Keep `.env.example` updated using placeholders only.
- Use a secret manager or deployment environment for production secrets.
- Grant the runtime database role only the permissions it needs; migration roles
  may need additional permissions in development.
- Future JWT signing keys, mail credentials and storage credentials follow the same rules.
- Never expose backend secrets through `NEXT_PUBLIC_` variables.

If a secret is exposed, revoke or rotate it promptly and inspect its use. Deleting
it from the latest commit does not remove it from Git history or invalidate copies.
Follow the project's [security policy](../../SECURITY.md) when reporting exposure.

This phase adds configuration and schema only. No real sensitive data is seeded;
password hashing and authentication remain future work.

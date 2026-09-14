# Local Development

Use Node.js 24.x and the pinned pnpm version. Install Docker with Compose v2 and
start Docker Desktop before running the database commands. Run these commands from
the repository root:

```bash
pnpm install
cp .env.example .env
```

Only copy the example if `.env` does not already exist. In PowerShell use
`Copy-Item .env.example .env`. Replace `JWT_ACCESS_SECRET` with a random secret of
at least 32 characters; the placeholder is deliberately rejected. Generate one with
`node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"`.
Never commit `.env` or share its contents.

```bash
pnpm db:up
pnpm db:generate
pnpm db:migrate --name init
pnpm dev:api
```

`db:up` waits for PostgreSQL health. Prisma and NestJS load the root `.env`;
process environment variables override file values. The local container initializes
the `openguild` role, password and database on its first start with an empty volume.
These credentials are for local development only. PostgreSQL is published only on
the loopback interface. The API remains bound to `127.0.0.1`.

```bash
curl http://127.0.0.1:3001
```

Expect `{"name":"OpenGuild API","status":"ok"}`. Use the
[authentication examples](./authentication-flow.md#manual-verification) to register,
log in and call `/auth/me`. In a separate terminal run `pnpm dev:web` for the frontend.

## Port conflicts and Windows / WSL

Run pnpm, Prisma and connectivity checks in the same environment. In WSL, enable
Docker Desktop's WSL integration for the distribution and verify `docker info`.
Install dependencies and run all pnpm commands from that same distribution. Do not
reuse a WSL `node_modules` directory from Windows (or vice versa): executable links
and native Prisma/Argon2 binaries differ. If switching environments, reinstall the
dependencies in the target environment before running commands.
Verify connectivity with `pg_isready -h localhost -p 5433` if installed, or
`Test-NetConnection localhost -Port 5433` in Windows PowerShell. A listening port
does not establish that the expected PostgreSQL instance or credentials are in use.

The default host port is 5433 because another local service already uses 5432.
Leave that service running and use the isolated Docker instance:

```env
POSTGRES_PORT="5433"
DATABASE_URL="postgresql://openguild:openguild@localhost:5433/openguild?schema=public"
```

Then rerun `pnpm db:up`. Do not change the container's internal port (5432).
Alternatively, stop the known conflicting service yourself and change both
`POSTGRES_PORT` and the port in `DATABASE_URL` to 5432.
When Windows localhost forwarding is unavailable from WSL, verify the Windows host
address and Docker networking configuration before changing the connection host;
do not assume a Windows and a WSL PostgreSQL listener are the same service.
The Compose service name `postgres` is for containers on the Compose network,
not for the API running directly in Windows or WSL.

## Troubleshooting and persistence

- `pnpm db:logs` shows PostgreSQL logs; `docker compose ps` shows health and ports.
- P1000 means credentials were rejected. Check the target instance and whether a
  shell-level `DATABASE_URL` overrides `.env`. Never print passwords while diagnosing.
- Container environment credentials initialize an empty volume only. Changing them
  later does not reset an existing database password. Use authorized database
  administration to repair existing credentials; do not delete useful data.
- `docker compose exec postgres psql -U openguild -d openguild -c '\du'` lists roles;
  use `-c '\l'` to list databases. These local socket checks do not verify the host password.
- `pnpm db:down` stops the container but preserves its named volume. Avoid `down -v`
  unless you deliberately intend to destroy the development database.
- The API intentionally fails startup if PostgreSQL is unreachable or credentials
  are invalid. Migrations are explicit and are never applied automatically at startup.

After setup, run `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm build`
and `pnpm --filter api test`. This Compose setup is not a production deployment.

The initial migration and the registration/login/current-user HTTP flow have been
verified against this Docker database from Ubuntu/WSL. The temporary verification
account was removed after testing.

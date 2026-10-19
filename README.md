# Noctra

Noctra is an open-source community communication platform inspired by modern chat applications.

The goal of this project is not to fully clone Discord, but to build a small, understandable and extensible communication platform with servers, channels, realtime messaging and, later, voice rooms.

## Goals

The project aims to provide:

- user accounts with username and profile picture;
- community servers;
- text channels;
- realtime messaging;
- simple roles and permissions;
- invitations;
- voice channels in a later version;
- clear documentation for contributors;
- documented security decisions and known limitations.

## Project status

The monorepo foundation includes a Next.js frontend in `apps/web` and a NestJS backend
in `apps/api`. PostgreSQL and Prisma are configured with an initial domain schema.
Initial JWT authentication is implemented in the API. Messaging endpoints remain planned.

No stable release is available yet.

## Planned stack

The planned technical stack is:

- Frontend: Next.js, TypeScript, Tailwind CSS
- Backend: NestJS, TypeScript
- Database: PostgreSQL
- ORM: Prisma
- Realtime: WebSocket or Socket.IO
- Voice: WebRTC in a later version

## Repository structure

```txt
noctra/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── shared/
│   └── config/
├── docs/
│   ├── architecture/
│   ├── security/
│   ├── roadmap/
│   └── contributing/
├── README.md
├── CONTRIBUTING.md
├── SECURITY.md
├── ROADMAP.md
└── LICENSE
```

## Documentation

Main documentation files:

- [Roadmap](./ROADMAP.md)
- [Contributing guide](./CONTRIBUTING.md)
- [Security policy](./SECURITY.md)
- [Architecture overview](./docs/architecture/overview.md)
- [API architecture overview](./docs/architecture/api-overview.md)
- [Database schema](./docs/architecture/database-schema.md)
- [Secrets management](./docs/security/secrets-management.md)
- [Authentication flow](./docs/architecture/authentication-flow.md)
- [Authentication security](./docs/security/authentication.md)

## Development

Use Node.js 24.15 or later in the 24.x LTS line and the pnpm version pinned in
`package.json`. All installation commands run from the repository root, which owns
the only workspace configuration and lockfile.

Install dependencies:

```bash
pnpm install
```

Run formatting:

```bash
pnpm format
```

Check formatting:

```bash
pnpm format:check
```

Run linting:

```bash
pnpm lint
```

Check types and build both applications:

```bash
pnpm typecheck
pnpm build
```

Run the applications in separate terminals:

```bash
pnpm dev:web
pnpm dev:api
```

The frontend is available at <http://localhost:3000> and the API at
<http://127.0.0.1:3001>. Set `API_PORT` to override the API port; `PORT` remains a
fallback. The API now requires a reachable PostgreSQL database at startup.

## Database

For a reproducible local PostgreSQL instance, start Docker Desktop and follow
[Local Development](./docs/architecture/local-development.md). If `.env` does not
exist yet, copy `.env.example` to `.env` and replace the JWT secret placeholder.

```bash
pnpm db:up
pnpm db:generate
pnpm db:migrate --name init
pnpm dev:api
```

Use `pnpm db:down` to stop PostgreSQL while preserving its data, or `pnpm db:logs`
to inspect logs. Port conflicts and Windows/WSL setup are covered in the guide.

Noctra uses PostgreSQL and Prisma. Create a local PostgreSQL database and role,
then copy the example configuration and adjust its development credentials:

```bash
cp .env.example .env
```

On PowerShell, use `Copy-Item .env.example .env`. Never commit `.env`.
Both the API and database scripts load this root file.

Generate the client without a running database:

```bash
pnpm db:generate
```

Run migrations when PostgreSQL is available:

```bash
pnpm db:migrate --name init
```

The development role needs permission to create a shadow database. Review and commit
the generated migrations. Use `pnpm db:studio` to inspect local data. This foundation
is not production-ready; see the [schema documentation](./docs/architecture/database-schema.md).

## Authentication

The API exposes `POST /auth/register`, `POST /auth/login` and protected `GET /auth/me`.
Configure `JWT_ACCESS_SECRET` with a random secret of at least 32 characters and
`JWT_ACCESS_EXPIRES_IN` (default `15m`) in your environment. The example secret must
be replaced before starting the API. A migrated PostgreSQL database is also required.

Run `pnpm --filter api test` for isolated authentication tests. See the
[authentication flow](./docs/architecture/authentication-flow.md) for curl examples,
secret generation and current limitations. Refresh tokens, rate limiting and frontend
authentication are not implemented yet.

## Current status

Noctra is currently in active development.

### Implemented

- pnpm monorepo structure
- Next.js frontend application
- NestJS backend API
- PostgreSQL database with Prisma
- JWT authentication backend:
  - register
  - login
  - protected `/auth/me`
- Argon2 password hashing
- input validation
- Docker-based PostgreSQL development setup
- project renamed from OpenGuild to Noctra
- first Noctra frontend prototype:
  - landing page
  - login page
  - register page
  - app dashboard
  - space layout
  - channel layout
  - member sidebar
  - message composer
  - create channel modal
  - profile settings
- frontend currently uses mock data

### Verified

The following have been tested successfully:

- PostgreSQL connection
- Prisma migrations
- API startup
- `GET /` returns:

```json
{
  "name": "Noctra API",
  "status": "ok"
}
````

* backend authentication endpoints
* frontend development server
* formatting
* linting
* TypeScript checks
* production builds

### Current development point

The frontend prototype is implemented, but it is not yet connected to the real backend.

The next major step is to connect the frontend authentication flow to the existing API:

* connect `/register` to `POST /auth/register`
* connect `/login` to `POST /auth/login`
* retrieve the authenticated user with `GET /auth/me`
* protect application routes
* add logout
* replace mock user data progressively with real API data

After authentication integration, development will continue with:

* real spaces and memberships
* channels
* messages
* realtime messaging with Socket.IO
* uploads
* moderation
* voice channels

## Contributing

Contributions are welcome.

Before contributing, please read:

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [SECURITY.md](./SECURITY.md)

## License

This project is licensed under the GNU Affero General Public License v3.0 or later.

Modified versions of this project must remain open source, including when the software is used to provide a network service.

See [LICENSE](./LICENSE) for more information.

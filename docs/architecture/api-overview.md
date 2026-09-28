# API Architecture Overview

The `apps/api` application contains the backend logic of Noctra. It uses NestJS and
TypeScript: modules, dependency injection and controllers provide a consistent structure
as the project grows.

## Frontend and backend

`apps/web` contains the Next.js user interface. The NestJS API owns business logic,
authorization and, later, database access. Shared types may live in `packages/shared`;
they do not replace runtime validation on the API.

## Planned responsibilities

- authentication;
- user profile management;
- server management;
- membership management;
- channel management;
- message management;
- invitation management;
- permission checks;
- realtime communication later;
- file upload handling later.

## Planned modules

- AuthModule
- UsersModule
- ProfilesModule
- ServersModule
- MembersModule
- ChannelsModule
- MessagesModule
- InvitationsModule
- RealtimeModule later
- UploadsModule later

## Security principles

The API must never trust client-side state. Every sensitive action should verify:

- the user is authenticated;
- the user belongs to the target server;
- the target resource belongs to the expected parent resource;
- the user has the required role or permission;
- the input payload is valid.

Authentication will require password hashing, a documented session or token strategy,
and rate limiting. Future work must also cover secret management, explicit CORS policy,
safe uploads and authorization for each realtime event. These protections are planned,
not implemented by the initial scaffold.

## Current status

The API includes the database foundation and initial JWT authentication.
`AppController` and `AppService` still provide `GET /`, returning
`{ "name": "Noctra API", "status": "ok" }`, alongside the authentication endpoints.
This is a process status endpoint, not a database readiness check.

Run `pnpm dev:api` from the repository root. The API binds to `127.0.0.1:3001` by
default; `API_PORT` overrides the port, with `PORT` as a fallback. The frontend uses
port 3000. `ConfigModule` loads the root `.env`; `PrismaModule` provides a shared
`PrismaService` that connects to PostgreSQL on startup and disconnects on shutdown.
A configured, reachable database and valid JWT secret are required to start the API.
Migrations are run explicitly, not at startup. Initial authentication is implemented
in AuthModule and UsersModule; realtime features remain planned. See
[Authentication Flow](./authentication-flow.md).

See [Database Schema](./database-schema.md) for models and migration commands.

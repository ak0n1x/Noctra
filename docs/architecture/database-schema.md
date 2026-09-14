# Database Schema

OpenGuild uses PostgreSQL for relational constraints, transactions and indexed queries.
Prisma provides a typed client and versioned schema migrations for the NestJS API.
The schema lives in `apps/api/prisma/schema.prisma`.

Prisma CLI and client are pinned together to 6.19.3 to retain the `prisma-client-js`
generator and the datasource URL in the schema. A future major upgrade must review
generator, configuration and driver changes together.

## Main models

| Model        | Purpose                                                            |
| ------------ | ------------------------------------------------------------------ |
| User         | Account email and password hash for future authentication          |
| Profile      | Unique username and optional public profile fields                 |
| Server       | Community owned by a user                                          |
| ServerMember | User membership and role within a server                           |
| Channel      | Ordered text or future voice channel within a server               |
| Message      | Channel content, author and optional soft deletion timestamp       |
| Invitation   | Unique invitation code, creator and optional expiry or usage limit |

IDs use Prisma-generated UUID strings. Creation timestamps default to the current
time; `updatedAt` is maintained by Prisma on models that include it.

## Main relationships

A user can have one profile, own multiple servers and join servers through
`ServerMember`. A server contains members, channels and invitations. A message
belongs to one channel and one author. An invitation belongs to one server and
has one creator.

All foreign keys currently use `onDelete: Cascade`. Deleting a user therefore also
deletes their owned servers and those servers' channels, messages, memberships and
invitations, as well as messages and invitations authored elsewhere. This is an
initial policy; account deletion must review retention and ownership transfer
before it becomes an exposed API operation. `Message.deletedAt` is only a field:
future queries must explicitly filter soft-deleted messages.

## Enums

- `ServerRole`: `OWNER`, `ADMIN`, `MEMBER`; new memberships default to `MEMBER`.
- `ChannelType`: `TEXT`, `VOICE`; new channels default to `TEXT`.

`VOICE` reserves a type for later work; voice communication is not implemented.

## Constraints and indexes

- Email and username are unique. Uniqueness is case-sensitive with the initial
  PostgreSQL string columns; authentication must define normalization rules.
- `Profile.userId` is unique, enforcing at most one profile per user.
- `(userId, serverId)` prevents duplicate memberships.
- `(serverId, name)` prevents duplicate channel names within a server.
- Invitation codes are globally unique.
- Foreign-key indexes support owner, membership, channel, author and invitation queries.
- The composite message index `(channelId, createdAt)` supports channel history queries.

Foreign keys do not enforce application permissions. Future services must enforce
membership checks, consistency between `Server.ownerId` and the `OWNER` membership,
message access, valid content, nonnegative positions, invitation expiry and usage
limits. Invitation consumption must use a transaction to prevent concurrent overuse.

## Local workflow

The API and Prisma scripts load the repository-root `.env`. Existing process
environment variables take precedence. `.env.example` contains development examples
only and is never loaded automatically.

```bash
pnpm db:generate
pnpm db:migrate --name init
pnpm db:studio
```

Client generation does not require a running database. API development, build, lint
and typecheck scripts generate the client before using its types. The API connects on
startup and disconnects on shutdown; starting it requires a configured, reachable
database. It does not automatically apply migrations.

`db:migrate` uses `prisma migrate dev` and requires a development database plus
permission to create a shadow database (or a separately configured shadow database).
Review generated SQL and commit the migration directory. Do not use this development
command against production or accept a reset of a database containing useful data.

## Current limitations

No initial migration has been created or applied yet: the local PostgreSQL server
rejected the example credentials during setup. Configure your own development
connection and run `pnpm db:migrate --name init` to create and apply it.

The schema is an initial version. Authentication and domain endpoints are not
implemented. It does not yet include refresh tokens, password reset tokens, email
verification, custom roles, granular permissions, attachments, audit logs, bans or
voice sessions. It is not production-ready.

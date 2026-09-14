# Authentication Security

Initial authentication uses Argon2id password hashes and short-lived JWT access
tokens. See [Authentication Flow](../architecture/authentication-flow.md) for the
endpoints, configuration and verification commands.

## Password hashing

Argon2id uses a fresh salt supplied by the library, 19 MiB of memory, two iterations
and one parallel lane. Only the encoded hash is stored in `User.passwordHash`.
Passwords are never logged or returned. Response objects are constructed explicitly
to avoid exposing credential fields even when login queries fetch the hash.

Input passwords are limited to 8-128 characters and are never normalized. Hashing
costs should be benchmarked on deployment hardware before public use.

## Validation and errors

A global NestJS ValidationPipe validates DTOs, rejects unknown properties and hides
input values and targets from validation errors. Email and username normalization
is performed before persistence. Prisma uniqueness constraints handle races, and
User/Profile creation is atomic.

Unknown emails and incorrect passwords receive the same login response. A dummy
hash verification reduces the timing difference for unknown accounts. Registration
returns a generic conflict but still reveals that the submitted combination cannot
be registered; complete account enumeration resistance is not implemented.

## Tokens and secrets

`JWT_ACCESS_SECRET` comes from the environment and must be a random secret of at
least 32 characters. The example placeholder is rejected. Never commit `.env`, tokens
or production secrets. See [Secrets Management](./secrets-management.md).

JWTs are signed, not encrypted. They contain the user ID and standard lifetime,
issuer and audience claims. The guard restricts signature verification to HS256 and
checks the current account in the database. It does not grant community permissions.

Use HTTPS outside local development. Do not log Authorization headers or request
bodies on authentication routes, including at reverse proxies and in monitoring
systems. Auth response caching is disabled. Keep access tokens out of URLs.

## Current risks

- There is no rate limiting yet: password guessing and resource exhaustion remain risks.
- Access tokens have no individual revocation or refresh mechanism. Client logout
  cannot invalidate a stolen token before it expires.
- Email ownership is unverified. Password reset and account recovery are absent.
- Frontend storage and browser security integration are not implemented.
- HTTP tests substitute database operations; live PostgreSQL verification requires
  valid development credentials and an applied migration.

Do not expose this phase publicly as a production authentication service.

## Future goals

- Refresh token rotation with server-side revocation and reuse detection.
- Rate limiting for registration and login.
- Email verification and secure, expiring, single-use password reset tokens.
- Audit logs that exclude secrets and minimize personal data.
- Explicit token invalidation after sensitive account changes.
- Security tests against a real database, including uniqueness races and rollback.

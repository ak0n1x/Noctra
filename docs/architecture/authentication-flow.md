# Authentication Flow

The NestJS API exposes `POST /auth/register`, `POST /auth/login` and `GET /auth/me`.
`AuthModule` uses Passport JWT, `@nestjs/jwt`, Argon2id and DTO validation.
`UsersModule` performs Prisma queries against the existing User and Profile models.

## Configuration

Configure the root `.env` or inject environment variables:

- `DATABASE_URL`: a working PostgreSQL connection with the initial schema migrated.
- `JWT_ACCESS_SECRET`: a random secret of at least 32 characters, never the example placeholder.
- `JWT_ACCESS_EXPIRES_IN`: defaults to `15m`; accepts integer durations with `s`, `m`,
  `h` or `d`, from one second to one day.

Generate a secret locally with `node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"`.
Store its output securely in your local configuration. The API refuses to start
with missing, short or placeholder secrets or an invalid token lifetime. No secret
is needed to build the applications or run the isolated authentication tests.

Run `pnpm db:migrate --name init` against a configured development database before
using authentication, then `pnpm dev:api`. The initial migration is included in
the repository; see [Local Development](./local-development.md).

## Registration

`RegisterDto` validates email, username and password. Email is trimmed and lowercased;
username is trimmed, lowercased and restricted to 3-32 ASCII letters, digits or
underscores. Passwords are not trimmed or normalized and must have 8-128 characters.
Email is limited to 254 characters. Extra properties and invalid types are rejected.

The password is hashed with Argon2id. Prisma creates User and Profile in one atomic
nested write. Database uniqueness constraints enforce email and username uniqueness,
including concurrent requests. A conflict returns HTTP 409 with a generic message.
Future imports and account updates must use the same normalization policy; existing
mixed-case data would require normalization before enabling those paths.

HTTP 201 returns `{ user: { id, email, username }, accessToken }`. Responses explicitly
select public fields and never include `passwordHash`. A legacy user without a
profile receives `username: null`.

## Login

`LoginDto` applies the same email and password rules. The API fetches the account
and verifies the supplied password with Argon2. Unknown emails and incorrect
passwords return the same HTTP 401 message: `Invalid email or password.`
Unknown accounts still verify against a random dummy hash created at startup to
reduce timing differences. This is not a guarantee of identical response times.

Successful login returns HTTP 200 with the same response shape as registration.

## JWT and protected routes

An access token contains the user ID as `sub`, issuance and expiration timestamps,
issuer `openguild-api` and audience `openguild`. It is signed with HS256. Tokens do
not contain email, password hashes or authorization roles.

`JwtAuthGuard` delegates to `JwtStrategy`, which accepts a token only from
`Authorization: Bearer <token>`, verifies its signature, algorithm, issuer, audience
and expiration, and loads the current user from the database. Missing users are
rejected. `GET /auth/me` returns `{ id, email, username }` for that user. Future
private controllers must import AuthModule and apply the guard; server membership
and role checks are separate responsibilities.

Successful authentication responses set `Cache-Control: no-store`.

## Manual verification

These examples use Bash syntax; replace `<TOKEN>` with a returned access token.
In PowerShell, use `curl.exe` with appropriate shell quoting.

```bash
curl -X POST http://127.0.0.1:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","username":"laye","password":"StrongPassword123!"}'

curl -X POST http://127.0.0.1:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"StrongPassword123!"}'

curl http://127.0.0.1:3001/auth/me \
  -H "Authorization: Bearer <TOKEN>"

curl -i http://127.0.0.1:3001/auth/me
```

The final request should return HTTP 401. Repeat registration to check HTTP 409;
try an incorrect password to check HTTP 401 and an extra body field to check HTTP 400.

Run `pnpm --filter api test` for HTTP tests using the real NestJS pipeline, Argon2
and JWT with an in-memory Prisma substitute. They cover public response fields,
validation, duplicate registrations, invalid credentials and protected routes. They
do not verify PostgreSQL constraints or migration execution; the manual workflow
above must also be exercised against a migrated database.

## Current limits and next steps

There is no session store, refresh token or logout endpoint. Logout means discarding
the token on the client; a copied token remains valid until expiration. Deleting the
user blocks subsequent authenticated requests. Password changes do not yet exist.

Frontend authentication screens and token storage are not implemented. Prefer
in-memory access tokens in a future client and review XSS exposure before choosing
persistent storage. Tokens must be sent over HTTPS outside loopback development.

Future work includes refresh token rotation and revocation, email verification,
secure password reset, rate limiting and audit logs. This initial authentication
implementation is not ready for public production deployment.

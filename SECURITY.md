# Security Policy

Security is an important part of Noctra.

Noctra is currently experimental and should not be considered production-ready.

The goal of this document is to explain the current security status of the project, the security goals, the known limitations and the expectations for contributors.

## Supported versions

No stable version is currently supported.

| Version | Supported |
| ------- | --------- |
| 0.x     | No        |

## Security goals

Noctra aims to progressively implement the following security measures:

- secure password hashing;
- strict input validation;
- server-side authorization checks;
- secure session or token handling;
- rate limiting on sensitive endpoints;
- safe file upload handling;
- websocket authentication and authorization;
- protection against common web vulnerabilities;
- dependency vulnerability checks;
- audit logs for sensitive actions;
- clear documentation of security decisions and limitations.

## Current security status

At this stage, the project is in its initial setup phase.

The database foundation uses `DATABASE_URL` for PostgreSQL credentials. Never commit
the real `.env`; `.env.example` contains local examples only. No real sensitive data
is seeded. See [Secrets Management](./docs/security/secrets-management.md).

Docker Compose provides local development PostgreSQL on loopback port 5433 with
example credentials. This setup must not be used for production. Keep the real
`.env` ignored and use separate credentials for deployed environments.

The following features are not implemented yet:

- refresh tokens and individual token revocation;
- authorization;
- role-based permissions;
- rate limiting;
- file upload validation;
- websocket security;
- audit logging;
- dependency scanning;
- production deployment hardening.

Because of this, Noctra should not be deployed publicly yet.

## Authentication requirements

Initial authentication uses Argon2id, strict DTO validation and JWT-protected routes.
Login errors are generic; JWT configuration is validated at startup. Rate limiting
and refresh tokens are not implemented. See [Authentication Security](./docs/security/authentication.md).

The project should continue to follow these rules:

- passwords must never be stored in plain text;
- passwords should be hashed with a secure password hashing algorithm such as Argon2 or bcrypt;
- authentication errors should not reveal whether an email or username exists;
- sessions or tokens must be stored securely;
- logout must invalidate the active session or token when possible;
- sensitive authentication endpoints should have rate limiting.

## Authorization requirements

The backend must never trust the frontend.

Every sensitive action should verify:

- the user is authenticated;
- the user belongs to the requested server;
- the user has the required role or permission;
- the target resource belongs to the expected server or channel.

Examples of sensitive actions:

- creating or deleting a server;
- creating or deleting a channel;
- inviting users;
- sending messages;
- deleting messages;
- uploading files;
- joining a voice room;
- changing roles.

## Input validation requirements

All user-controlled input must be validated on the server.

This includes:

- registration data;
- login data;
- profile updates;
- server names;
- channel names;
- messages;
- invitation codes;
- file metadata;
- websocket payloads.

Validation should check:

- required fields;
- data types;
- minimum and maximum lengths;
- allowed characters when relevant;
- enum values;
- file size and file type when uploads are implemented.

## Realtime security requirements

Realtime events must be treated like API requests.

Socket or websocket events should verify:

- the socket is authenticated;
- the user is allowed to access the server;
- the user is allowed to access the channel;
- the event payload is valid;
- the user is not sending events too quickly.

The client must not be allowed to choose sensitive values such as:

- author ID;
- server membership;
- role;
- permission level.

These values must be derived from the authenticated user and database state.

## File upload security requirements

File uploads are planned for profile pictures, server icons and possibly message attachments later.

When implemented, uploads should follow these rules:

- define a maximum file size;
- allow only safe file types at first;
- verify MIME type server-side;
- rename files on the server;
- never trust the original filename;
- avoid storing executable files;
- avoid exposing private files publicly;
- document storage limitations clearly.

Initial upload support should focus on images only.

## Rate limiting requirements

Rate limiting should be added to sensitive actions.

Priority endpoints and events:

- registration;
- login;
- password reset, if implemented later;
- invitation usage;
- message sending;
- file uploads;
- websocket message events.

The first version can use simple per-IP and per-user limits.

## Secrets management

Secrets must never be committed to the repository.

Examples of secrets:

- database URLs;
- JWT secrets;
- refresh token secrets;
- OAuth client secrets;
- S3 or object storage credentials;
- production environment variables.

The repository should provide an example environment file such as:

```txt
.env.example
```

but never a real `.env` file.

## Dependency management

Dependencies should be reviewed regularly.

Recommended checks:

- avoid unused dependencies;
- keep dependencies updated;
- run vulnerability audits;
- prefer well-maintained packages;
- avoid packages with unclear ownership or suspicious behavior.

## Security documentation

Security decisions should be documented in:

```txt
docs/security/
```

Planned documents:

```txt
docs/security/overview.md
docs/security/authentication.md
docs/security/authorization.md
docs/security/input-validation.md
docs/security/rate-limiting.md
docs/security/file-upload.md
docs/security/websocket-security.md
docs/security/known-risks.md
```

## Reporting a vulnerability

Please do not open a public issue with exploit details.

If you discover a vulnerability, report it privately to the maintainer.

If private contact is not available yet, open a minimal public issue stating that a security concern exists, without providing technical exploit details.

Example public issue title:

```txt
Security concern in authentication flow
```

Do not include:

- exploit steps;
- working payloads;
- private data;
- secrets;
- screenshots exposing sensitive information.

## Contributor security expectations

Contributors should avoid:

- committing secrets;
- logging passwords or tokens;
- trusting client-side authorization;
- bypassing permission checks;
- accepting unsafe uploads;
- exposing internal errors to users;
- adding dependencies without clear need;
- weakening validation for convenience.

Security-related pull requests should explain:

- what risk is addressed;
- what validation was added;
- what authorization checks were added;
- what remains out of scope;
- how the change was tested.

## Known limitations

Noctra currently does not provide:

- production-ready authentication;
- end-to-end encryption;
- advanced moderation;
- automated abuse detection;
- complete audit logging;
- formal security audit;
- high availability;
- horizontal scaling guarantees;
- hardened deployment configuration.

These limitations should be addressed progressively and documented as the project evolves.

## License and openness

Noctra is licensed under the GNU Affero General Public License v3.0 or later.

The license was chosen to help ensure that modified versions of the project remain open source, including when the software is used to provide a network service.

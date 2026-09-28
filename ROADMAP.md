# Roadmap

This roadmap describes the planned evolution of Noctra.

The goal is to build the project progressively, starting with a small but solid MVP. Noctra is not intended to be a full Discord clone, but a clear, documented and extensible open-source communication platform.

## Version 0.1 — Project foundation

Goals:

- initialize the monorepo;
- add TypeScript, ESLint and Prettier;
- add the main documentation files;
- define the architecture overview;
- choose and document the open-source license;
- prepare the project for future frontend and backend apps.

Status: the Next.js frontend (`apps/web`), NestJS backend (`apps/api`) and shared
monorepo commands are initialized. PostgreSQL and Prisma are configured with the
initial seven-model schema and NestJS connection lifecycle. Initial authentication is implemented.

Phase 2 status: client generation, schema validation and the initial migration are
implemented. The migration has been applied to the local Docker PostgreSQL database.
See [Local Development](./docs/architecture/local-development.md) for setup.

## Version 0.2 — Authentication

Status: initial backend registration, login and JWT-protected current-user endpoint
are implemented with Argon2id, strict DTO validation and isolated HTTP tests. The
registration, login and current-user flow has also been verified against Docker PostgreSQL.
Refresh tokens, logout revocation and rate limiting remain planned.

Planned features:

- user registration;
- user login;
- user logout;
- current user endpoint;
- password hashing;
- protected routes;
- basic rate limiting on authentication endpoints;
- initial session or token strategy.

Security goals:

- no plain text passwords;
- validated user input;
- generic authentication errors;
- no secrets committed in the repository.

## Version 0.3 — User profiles

Planned features:

- username;
- display name;
- profile picture;
- profile update page;
- basic account settings.

Security goals:

- validate usernames and display names;
- restrict profile picture file type and size;
- avoid using raw uploaded filenames.

## Version 0.4 — Servers and membership

Planned features:

- create a server;
- list joined servers;
- update server information;
- delete a server as owner;
- join a server through an invitation;
- leave a server;
- list server members;
- simple roles: OWNER, ADMIN, MEMBER.

Security goals:

- verify server membership before accessing server data;
- verify role before administrative actions;
- prevent unauthorized invitation usage.

## Version 0.5 — Text channels

Planned features:

- create text channels;
- list channels in a server;
- rename channels;
- delete channels;
- reorder channels later if needed;
- check permissions before channel actions.

Security goals:

- verify membership before accessing a channel;
- restrict channel management to OWNER and ADMIN;
- validate channel names.

## Version 0.6 — Messaging

Planned features:

- send messages;
- load message history;
- edit own messages;
- delete own messages;
- allow admins to delete messages;
- validate message size and content;
- paginate message history.

Security goals:

- verify channel access before sending messages;
- validate message payloads;
- prevent empty or oversized messages;
- avoid trusting client-provided author IDs.

## Version 0.7 — Realtime communication

Planned features:

- realtime message delivery;
- socket authentication;
- channel room subscription;
- user presence;
- typing indicators, optional;
- basic anti-spam protection.

Security goals:

- authenticate sockets;
- verify server and channel membership before joining rooms;
- validate every realtime payload;
- apply rate limiting or throttling on message events.

## Version 0.8 — File uploads

Planned features:

- upload profile pictures;
- upload server icons;
- optional message attachments later;
- local storage in development;
- object storage support later.

Security goals:

- enforce max file size;
- allow only safe image types at first;
- rename files server-side;
- avoid public access to unauthorized files;
- document upload limitations.

## Version 0.9 — Tests and quality

Planned features:

- unit tests for authentication;
- unit tests for authorization;
- integration tests for server and channel APIs;
- basic end-to-end tests for the main user flow;
- CI pipeline for lint, typecheck and tests.

Quality goals:

- zero TypeScript errors;
- zero critical ESLint errors;
- formatting enforced;
- documentation updated for major features.

## Version 1.0 — Public MVP

Goals:

- usable local development setup;
- complete basic documentation;
- stable authentication;
- stable user profiles;
- stable servers and text channels;
- stable realtime messaging;
- basic security protections;
- clear contribution guide;
- clear known limitations;
- public GitHub repository ready for contributors.

Expected MVP features:

- register and login;
- create and manage a profile;
- create and join servers;
- create and manage text channels;
- send and receive realtime messages;
- simple role-based permissions.

## Version 1.1 — Moderation basics

Planned features:

- delete inappropriate messages as admin;
- kick members;
- ban members, optional;
- server audit logs;
- improved permission documentation.

Security goals:

- log sensitive moderation actions;
- prevent privilege escalation;
- restrict moderation actions to authorized roles.

## Version 1.2 — Better contribution experience

Planned features:

- issue templates;
- pull request template;
- architecture decision records;
- beginner-friendly issues;
- local development guide;
- seed data for testing.

Goals:

- make the project easier to understand;
- reduce setup friction;
- help new contributors pick tasks.

## Version 2.0 — Voice channels

Planned features:

- voice channels;
- WebRTC signaling;
- join and leave voice rooms;
- display connected voice users;
- mute and unmute locally;
- document voice architecture and limitations.

Security goals:

- verify room access before signaling;
- prevent unauthorized users from joining voice rooms;
- document WebRTC limitations;
- avoid exposing unnecessary user metadata.

## Long-term ideas

These features are not part of the first MVP:

- video calls;
- screen sharing;
- private direct messages;
- message reactions;
- custom roles and granular permissions;
- bots and webhooks;
- mobile application;
- federation between instances;
- end-to-end encryption;
- advanced moderation tools;
- full-text message search;
- production-grade horizontal scaling.

## Known non-goals

Noctra does not aim to:

- fully clone Discord;
- provide all enterprise-grade features from day one;
- support huge communities in the first versions;
- implement complex voice/video infrastructure in the MVP;
- guarantee production readiness before a stable release.

## Contribution priorities

The most useful contributions will be:

- security improvements;
- documentation improvements;
- tests;
- bug fixes;
- accessibility improvements;
- small, focused features aligned with the roadmap.

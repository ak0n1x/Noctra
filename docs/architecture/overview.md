# Architecture Overview

OpenGuild is designed as a modular open-source communication platform.

The goal is to keep the project understandable, maintainable and extensible for contributors.

OpenGuild is not intended to be a full Discord clone. It aims to provide a smaller and documented alternative focused on servers, channels, realtime messaging and, later, voice rooms.

## High-level architecture

The project is organized as a monorepo.

```txt
openguild/
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── shared/
│   └── config/
└── docs/
```

## Applications

### Web application

Location:

```txt
apps/web
```

The web application contains the Next.js user interface. Its minimal application
shell is initialized; the responsibilities below are planned.

Planned responsibilities:

- authentication pages;
- user profile pages;
- server list;
- server creation flow;
- channel list;
- chat interface;
- member list;
- profile settings;
- voice room interface in a later version.

Planned stack:

- Next.js;
- TypeScript;
- Tailwind CSS.

### API application

Location:

```txt
apps/api
```

The API application contains the NestJS backend logic. The initial backend phase
is in progress. See [API Architecture Overview](./api-overview.md) for the current
setup, module plan and security boundaries.

Planned responsibilities:

- authentication;
- user management;
- profile management;
- server management;
- membership management;
- channel management;
- message management;
- realtime communication;
- permission checks;
- file upload handling;
- audit logs in a later version.

Planned stack:

- NestJS;
- TypeScript;
- Prisma;
- PostgreSQL;
- Socket.IO or WebSocket.

## Shared packages

### packages/shared

This package contains code shared between the frontend and the backend.

Examples:

- shared types;
- validation schemas;
- constants;
- role definitions;
- permission names;
- API response types.

### packages/config

This package contains shared configuration files.

Examples:

- TypeScript configuration;
- ESLint configuration;
- Prettier configuration;
- shared build configuration later if needed.

## Core domain concepts

### User

A user represents a registered account.

A user can:

- create servers;
- join servers;
- send messages;
- update their profile;
- upload a profile picture later.

A user should not directly receive permissions globally. Most permissions should depend on their membership inside a server.

### Profile

A profile contains public account information.

A profile may include:

- username;
- display name;
- avatar URL;
- bio later if needed.

Profile data should be validated because it is displayed to other users.

### Server

A server represents a community space.

A server can contain:

- members;
- text channels;
- voice channels later;
- invitations;
- roles and permissions.

A server has one owner.

The owner has the highest level of control over the server.

### Server member

A server member links a user to a server.

It stores the user role inside that server.

Initial roles:

- OWNER;
- ADMIN;
- MEMBER.

The first version will keep roles simple. More granular permissions may be introduced later.

### Channel

A channel belongs to a server.

Initial channel types:

- TEXT;
- VOICE, planned later.

A text channel contains messages.

A voice channel will represent a room that users can join for audio communication.

### Message

A message belongs to a text channel and is authored by a user.

Messages should support:

- creation;
- history loading;
- editing by the author;
- deletion by the author;
- deletion by admins or owner;
- realtime delivery.

Messages should be paginated to avoid loading too much data at once.

### Invitation

An invitation allows a user to join a server.

An invitation may include:

- invitation code;
- server ID;
- creator ID;
- expiration date;
- usage limit later if needed.

Invitation usage must be validated server-side.

## Initial role model

The first version will use three roles.

### OWNER

The owner can:

- update server settings;
- delete the server;
- create channels;
- delete channels;
- manage invitations;
- manage members;
- delete messages.

### ADMIN

An admin can:

- create channels;
- delete channels;
- manage invitations;
- delete messages;
- moderate members later.

### MEMBER

A member can:

- read accessible channels;
- send messages;
- edit their own messages;
- delete their own messages;
- join voice channels later.

## Permission principles

The backend must never trust the frontend.

Every sensitive action should verify:

- the user is authenticated;
- the user belongs to the server;
- the target resource belongs to the expected server;
- the user has the required role or permission;
- the input data is valid.

Examples:

- before sending a message, verify that the user belongs to the server containing the channel;
- before deleting a channel, verify that the user is OWNER or ADMIN;
- before using an invitation, verify that the invitation exists and is still valid;
- before joining a voice room, verify that the user is a member of the server.

## Planned data model

The initial database model will likely include:

```txt
User
Profile
Server
ServerMember
Channel
Message
Invitation
Session or RefreshToken
```

Later models may include:

```txt
Role
Permission
FileUpload
AuditLog
VoiceSession
Ban
Webhook
```

## API architecture

The backend should expose REST endpoints first.

Example areas:

```txt
/auth
/users
/profile
/servers
/servers/:serverId/members
/servers/:serverId/channels
/channels/:channelId/messages
/invitations
```

The realtime layer should be added after the basic REST API is stable.

## Realtime architecture

Realtime messaging will be implemented after the basic server, channel and message features are working.

The realtime layer should handle:

- socket authentication;
- joining channel rooms;
- sending messages;
- broadcasting new messages;
- editing messages;
- deleting messages;
- presence later;
- typing indicators later.

Realtime events must be treated like API requests.

Every socket event should verify:

- the socket is authenticated;
- the user belongs to the server;
- the user has access to the channel;
- the payload is valid;
- the event is not being spammed.

The client must not be allowed to decide sensitive values such as:

- author ID;
- role;
- permission level;
- server membership.

These values must come from the authenticated user and the database.

## File storage architecture

File uploads are planned after authentication and profiles are stable.

Initial upload targets:

- profile pictures;
- server icons.

Possible future upload targets:

- message attachments;
- voice room images or metadata;
- custom server banners.

The first version can use local storage in development.

A later version may support object storage such as S3-compatible storage.

Upload security rules:

- define maximum file size;
- allow only safe image types at first;
- verify MIME type server-side;
- rename files server-side;
- avoid trusting original filenames;
- avoid exposing private files publicly.

## Voice architecture

Voice channels are planned for a later version.

The first target will likely use:

- WebRTC for audio;
- Socket.IO or WebSocket for signaling;
- server-side validation for room access.

Voice features are intentionally excluded from the first MVP because they add significant complexity.

The voice system will need to handle:

- joining a voice room;
- leaving a voice room;
- tracking connected users;
- signaling between peers;
- microphone mute state;
- disconnection handling.

Video calls and screen sharing are not part of the first voice milestone.

## Documentation architecture

Documentation is part of the project architecture.

Important documentation areas:

```txt
docs/architecture/
docs/security/
docs/roadmap/
docs/contributing/
```

Planned architecture documents:

```txt
docs/architecture/overview.md
docs/architecture/database-schema.md
docs/architecture/authentication-flow.md
docs/architecture/server-membership.md
docs/architecture/permissions.md
docs/architecture/realtime-messaging.md
docs/architecture/file-storage.md
docs/architecture/voice-channels.md
```

## Security documentation

Security documentation will be maintained in:

```txt
docs/security/
```

Planned security documents:

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

## Non-goals for the first MVP

The first MVP will not include:

- complete Discord feature parity;
- video calls;
- screen sharing;
- end-to-end encryption;
- mobile applications;
- federation between instances;
- complex custom roles;
- bot platform;
- advanced moderation automation;
- production-grade horizontal scaling.

These may be explored later, but they should not block the first usable version.

## Architecture principles

OpenGuild should follow these principles:

- keep the code understandable;
- keep features small and documented;
- prefer explicit authorization checks;
- validate all user input server-side;
- avoid trusting client-side state;
- keep shared types and constants centralized;
- document important decisions;
- avoid unnecessary complexity before the MVP is stable.

## Current status

The project is currently in the foundation phase.

Current focus:

- repository structure;
- documentation;
- license;
- development tooling;
- architecture planning.

Next planned technical steps:

- expand the initialized Next.js frontend;
- develop the initialized NestJS backend;
- apply and evolve the [initial PostgreSQL and Prisma schema](./database-schema.md);
- implement authentication.

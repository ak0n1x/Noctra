# OpenGuild

OpenGuild is an open-source community communication platform inspired by modern chat applications.

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

This project is currently in its early planning and architecture phase.

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
openguild/
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

## Development

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

## Contributing

Contributions are welcome.

Before contributing, please read:

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [SECURITY.md](./SECURITY.md)

## License

This project is licensed under the GNU Affero General Public License v3.0 or later.

Modified versions of this project must remain open source, including when the software is used to provide a network service.

See [LICENSE](./LICENSE) for more information.

import { Injectable, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { randomBytes } from "node:crypto";
import * as argon2 from "argon2";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { AuthenticatedUser } from "./types/authenticated-user";

const hashOptions = { type: argon2.argon2id, memoryCost: 19456, timeCost: 2, parallelism: 1 };

@Injectable()
export class AuthService implements OnModuleInit {
  private dummyHash!: string;

  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async onModuleInit() {
    // Unknown accounts still perform a password verification to reduce timing differences.
    this.dummyHash = await argon2.hash(randomBytes(32), hashOptions);
  }

  async register(dto: RegisterDto) {
    const passwordHash = await argon2.hash(dto.password, hashOptions);
    const user = await this.users.create(dto.email, dto.username, passwordHash);
    return this.issueToken(user);
  }

  async login(dto: LoginDto) {
    const user = await this.users.findByEmail(dto.email);
    const valid = await argon2.verify(user?.passwordHash ?? this.dummyHash, dto.password);
    if (!user || !valid) {
      throw new UnauthorizedException("Invalid email or password.");
    }
    return this.issueToken(user);
  }

  private async issueToken(record: {
    id: string;
    email: string;
    profile: { username: string } | null;
  }) {
    const user: AuthenticatedUser = {
      id: record.id,
      email: record.email,
      username: record.profile?.username ?? null,
    };
    return { user, accessToken: await this.jwt.signAsync({ sub: user.id }) };
  }
}

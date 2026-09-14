import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

const publicUserSelect = {
  id: true,
  email: true,
  profile: { select: { username: true } },
} satisfies Prisma.UserSelect;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: { ...publicUserSelect, passwordHash: true },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id }, select: publicUserSelect });
  }

  async create(email: string, username: string, passwordHash: string) {
    try {
      return await this.prisma.user.create({
        data: { email, passwordHash, profile: { create: { username } } },
        select: publicUserSelect,
      });
    } catch (error: unknown) {
      // Database constraints also protect concurrent registrations; the nested write is atomic.
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ConflictException("Unable to register with these details.");
      }
      throw error;
    }
  }
}

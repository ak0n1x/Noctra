import { ConfigService } from "@nestjs/config";

export function authOptions(config: ConfigService) {
  const secret = config.get<string>("JWT_ACCESS_SECRET");
  if (!secret || secret.trim().length < 32 || secret.includes("change-me")) {
    throw new Error("JWT_ACCESS_SECRET must be a random secret of at least 32 characters.");
  }
  const lifetime = config.get<string>("JWT_ACCESS_EXPIRES_IN") ?? "15m";
  const match = /^(\d+)(s|m|h|d)$/.exec(lifetime);
  const units: Record<string, number> = { s: 1, m: 60, h: 3600, d: 86400 };
  const expiresIn = match ? Number(match[1]) * (units[match[2] ?? ""] ?? 0) : 0;
  if (!Number.isSafeInteger(expiresIn) || expiresIn < 1 || expiresIn > 86400) {
    throw new Error("JWT_ACCESS_EXPIRES_IN must be a duration from 1s to 1d, for example 15m.");
  }
  return { secret, expiresIn };
}

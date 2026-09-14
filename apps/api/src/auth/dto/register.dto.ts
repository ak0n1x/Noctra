import { Transform } from "class-transformer";
import { IsString, Length, Matches } from "class-validator";
import { LoginDto } from "./login.dto";

export class RegisterDto extends LoginDto {
  @Transform(({ value }: { value: unknown }) =>
    typeof value === "string" ? value.trim().toLowerCase() : value,
  )
  @IsString()
  @Length(3, 32)
  @Matches(/^[a-z0-9_]+$/)
  username!: string;
}

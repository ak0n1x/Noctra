import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3001, "127.0.0.1");
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

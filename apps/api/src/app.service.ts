import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getStatus() {
    return { name: "OpenGuild API", status: "ok" };
  }
}

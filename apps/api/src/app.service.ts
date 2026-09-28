import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getStatus() {
    return { name: "Noctra API", status: "ok" };
  }
}

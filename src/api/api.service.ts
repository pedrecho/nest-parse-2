import { Injectable } from '@nestjs/common';
import { ScrapeService } from "../scrape/scrape.service";
import { Roles } from "../auth/roles-auth.decorator";

@Injectable()
export class ApiService {
  constructor() {}

  async startParse() {
    ScrapeService.isParse = true;
  }

  async stopParse() {
    ScrapeService.isParse = false;
  }
}

import { Injectable } from '@nestjs/common';
import { ScrapeService } from '../scrape/scrape.service';

@Injectable()
export class ApiService {
  constructor(private scrapeService: ScrapeService) {}

  async startParse() {
    this.scrapeService.isParse = true;
  }

  async stopParse() {
    this.scrapeService.isParse = false;
  }
}

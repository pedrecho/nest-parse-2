import { Controller, Get } from '@nestjs/common';
import { ScrapeService } from './scrape.service';

@Controller('scrape')
export class ScrapeController {
  constructor(private scrapeService: ScrapeService) {}

  @Get()
  scrape() {
    return this.scrapeService.data;
  }
}

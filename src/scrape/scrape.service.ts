import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as rp from 'request-promise';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ScrapeService {
  private _isParse = true;
  private _data = [];

  get isParse(): boolean {
    return this._isParse;
  }

  set isParse(value: boolean) {
    this._isParse = value;
  }

  get data(): any[] {
    return this._isParse ? this._data : [];
  }

  @Cron('5 * * * * *')
  async scrapeLoop() {
    if (this.isParse) {
      this._data = await this.scrape();
    }
  }

  async scrape() {
    const data = [];
    for (let i = 1; i < Number(process.env.NUMBER_OF_PAGES) + 1; ++i) {
      const url = process.env.URL + `&sell=${i}`;
      await rp(url)
        .then((html) => {
          const $ = cheerio.load(html);
          const sellTable = $('tbody')[0];
          const tds = $('td', sellTable);
          for (let k = 0; k * 5 < tds.length; ++k) {
            data.push({
              seller: $(tds[k * 5]).text(),
              method: $(tds[k * 5 + 1]).text(),
              cost: $(tds[k * 5 + 2]).text(),
              sum: $(tds[k * 5 + 3]).text(),
            });
          }
        })
        .catch((err) => {
          console.log(`Произошла ошибка: ${err}`);
        });
    }

    return data;
  }
}

import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio'
import * as rp from 'request-promise'


@Injectable()
export class ScrapeService {
  static isParse: Boolean = true;
  static data = {};

  async getData() {
    return (ScrapeService.isParse && ScrapeService.data) || {};
  }

  static async scrapeLoop() {
    setInterval(() => {
      this.scrape();
    }, 5000);
  }

  static async scrape() {
    let data = [];
    if (!ScrapeService.isParse) {
      return data;
    }
    for(let i = 1; i < Number(process.env.NUMBER_OF_PAGES) + 1; ++i) {
      const url = process.env.URL + `&sell=${i}`;
      await rp(url)
        .then((html) => {
          const $ = cheerio.load(html)
          const sellTable = $('tbody')[0];
          const tds = $('td', sellTable);
          // console.log(tds.length);
          for(let k = 0; k * 5 < tds.length; ++k) {
            data.push({
              "seller": $(tds[k * 5]).text(),
              "method": $(tds[k * 5 + 1]).text(),
              "cost": $(tds[k * 5 + 2]).text(),
              "sum": $(tds[k * 5 + 3]).text()
            });
          }
        })
        .catch((err) => {
          console.log(`Произошла ошибка: ${err}`);
        })
    }
    // console.log(data.length);
    // console.log(data);
    ScrapeService.data = data;
  }
}

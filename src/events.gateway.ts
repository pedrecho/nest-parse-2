import { ScrapeService } from './scrape/scrape.service';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class EventsGateway {
  constructor(private scrapeService: ScrapeService) {}

  @WebSocketServer()
  private server;

  // @UseGuards(JwtAuthGuard)
  @SubscribeMessage('parsing')
  handleMessage() {
    setInterval(() => {
      this.scrapeService.getData().then((item) => {
        this.server.emit('parsing', item);
      });
    }, 1000);
  }
}

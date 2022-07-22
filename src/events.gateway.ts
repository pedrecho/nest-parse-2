import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { ScrapeService } from "./scrape/scrape.service";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";


@WebSocketGateway()
export class EventsGateway {
    constructor(private scrapeService: ScrapeService) {}

    @WebSocketServer()
    server;

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
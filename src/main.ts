import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import { ScrapeService } from "./scrape/scrape.service";


const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await NestFactory.create(AppModule);
        await ScrapeService.scrapeLoop();

        await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}


start()
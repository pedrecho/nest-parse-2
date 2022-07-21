import { forwardRef, Module } from "@nestjs/common";
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { ScrapeModule } from "../scrape/scrape.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  providers: [ApiService],
  controllers: [ApiController],
  imports: [
    ScrapeModule,
    forwardRef(() => AuthModule),
  ]
})
export class ApiModule {}

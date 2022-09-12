import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { ScrapeModule } from '../scrape/scrape.module';
import { AuthModule } from '../auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  providers: [ApiService],
  controllers: [ApiController],
  imports: [
    ScrapeModule,
    AuthModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
})
export class ApiModule {}

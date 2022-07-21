import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.model";
import {AuthModule} from "./auth/auth.module";
import {ServeStaticModule} from "@nestjs/serve-static";
import {doc} from "prettier";
import { ScrapeModule } from './scrape/scrape.module';
import * as path from "path";
import { EventsGateway } from "./events.gateway";
import { ApiModule } from './api/api.module';


@Module({
    controllers: [],
    providers: [EventsGateway],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env["PG_HOST"],
            port: Number(process.env["PG_PORT"]),
            username: process.env["PG_USER"],
            password: process.env["PG_PASSWORD"],
            database: process.env["PG_DB"],
            models: [User],
            autoLoadModels: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        UsersModule,
        AuthModule,
        ScrapeModule,
        ApiModule,
    ],
})
export class AppModule {}
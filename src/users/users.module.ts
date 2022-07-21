import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { AuthService } from '../auth/auth.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
    imports: [
      forwardRef(() => AuthModule),
      SequelizeModule.forFeature([User]),
    ],
})
export class UsersModule {}

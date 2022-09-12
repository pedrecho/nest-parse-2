import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';

import jwtSecretConfig from '../_config/jwt.config';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot({
      load: [jwtSecretConfig],
      ignoreEnvFile: process.env['NODE_ENV'] === 'production',
    }),
    forwardRef(() => UsersModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtSecretConfig().secret,
      signOptions: { expiresIn: jwtSecretConfig().expirationTime },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

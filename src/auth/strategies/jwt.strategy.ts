import { ExtractJwt, Strategy } from 'passport-jwt';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import jwtSecretConfig, { JwtSecretConfig } from '../../_config/jwt.config';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/users.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  public constructor(
    @Inject(jwtSecretConfig.KEY) jwtConfig: JwtSecretConfig,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: User): Promise<User> {
    const userOrNull = this.userService.getUserByEmail(payload.email);
    if (!userOrNull) {
      throw new UnauthorizedException();
    }
    return userOrNull;
  }
}

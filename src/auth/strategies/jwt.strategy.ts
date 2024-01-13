import { UsersService } from './../../users/services/users.service';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.get('app.jwt_secret'),
    });
  }

  async validate(payload: any) {
    const credential = { id: payload.sub, username: payload.username };

    const user = await this.userService.findOne(credential);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

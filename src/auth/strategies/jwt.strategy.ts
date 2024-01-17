import { UsersService } from './../../users/services/users.service';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Utils } from '@app/shared/utils';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('app.jwt_secret'),
    });
  }

  async validate(payload: any) {
    const credential = {};

    const isEmail = Utils.isEmail(payload.username);
    if (isEmail) {
      Object.assign(credential, {
        _id: payload.sub,
        email: payload.username,
      });
    } else {
      Object.assign(credential, {
        _id: payload.sub,
        phone: payload.username,
      });
    }

    console.log(credential);
    const user = await this.userService.findOne(credential);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

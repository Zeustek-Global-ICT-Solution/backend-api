import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '@app/shared/schemas';
import { AppException } from '@app/shared';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'id',
      passwordField: 'password',
    });
  }

  async validate(id: string, password: string): Promise<Partial<User>> {
    const userWithoutPsw = await this.authService.validateUser({
      id: id,
      password,
    });

    if (!userWithoutPsw) {
      throw new AppException(404, 'Invalid credentials');
    }
    return userWithoutPsw;
  }
}

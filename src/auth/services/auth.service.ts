/* eslint-disable @typescript-eslint/no-unused-vars */
import { Utils } from './../../../libs/shared/src/utils/utils/index';
import { UsersService } from './../../users/services/users.service';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppException } from '@app/shared';
import * as bcrypt from 'bcrypt';
import { CommunicationService } from '@app/shared/communication/services/communication.service';
import { BaseService } from '@app/shared/base/base.service';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    private readonly usersService: UsersService,
    protected jwtService: JwtService,
    protected communicationService: CommunicationService,
    protected config: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    super();
  }

  async register(createAuthDto: any) {
    try {
      const user = await this.usersService.findOne({
        $or: [{ email: createAuthDto.id }, { phone: createAuthDto.id }],
      });

      if (user) {
        throw new AppException(409, 'User already registered');
      }
      const payload = { password: createAuthDto.password };
      const isEmail = Utils.isEmail(createAuthDto.id);
      console.log(isEmail);
      if (isEmail) {
        Object.assign(payload, { email: createAuthDto.id });
      } else {
        Object.assign(payload, { phone: createAuthDto.id });
      }

      return await this.usersService.create(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async login(user: any) {
    try {
      const payload = {
        phone: user.phone,
        email: user.email,
        sub: user._id,
      };
      const { password, ...userWithoutPassword } = user;
      return {
        user: userWithoutPassword._doc,
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new AppException(404, error.message);
    }
  }

  async validateUser(createAuthDto: any) {
    try {
      const payload = {};
      const isEmail = await Utils.isEmail(createAuthDto.id);
      if (isEmail) {
        Object.assign(payload, { email: createAuthDto.id });
      } else {
        Object.assign(payload, { phone: createAuthDto.id });
      }
      const user = await this.usersService.findOne(payload);

      const isMatch = await bcrypt.compare(
        createAuthDto.password,
        user.password,
      );
      if (user && isMatch) {
        return user;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  profile(id: number) {
    return `This action returns a #${id} auth`;
  }

  async getToken(identity: string) {
    try {
      const payload = {};
      const isEmail = Utils.isEmail(identity);
      const token =
        this.config.get<string>('service.nodeEnv') == 'production'
          ? Utils.generateToke()
          : 123456;
      const saved = await this.cacheManager.set(identity, token, 60000);
      console.log(saved);

      if (isEmail) {
        Object.assign(payload, { address: identity });
        return await this.communicationService.sendEmail({
          subject: 'Reset Password',
          body: `Jummai verification code: ${token}`,
          emails: [payload],
        });
      } else {
        Object.assign(payload, { phone: identity });
        return await this.communicationService.sendSMS({});
      }
    } catch (error) {
      throw new AppException(400, error);
    }
  }

  async resetPassword(payload: any) {
    try {
    } catch (error) {
      throw new AppException(400, error);
    }
  }

  async verify(payload: any) {
    const result = await this.cacheManager.get(payload.identity);
    return `This action removes a #${result} auth`;
  }
}

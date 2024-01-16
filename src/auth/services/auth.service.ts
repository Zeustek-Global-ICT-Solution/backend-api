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

      return {
        user: user,
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
        const { password, ...userWithoutPassword } = user.toJSON();
        return userWithoutPassword;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async getToken(identity: string) {
    try {
      const payload = {};

      const user = await this.usersService.findOne({
        $or: [{ email: identity }, { phone: identity }],
      });

      if (!user) {
        throw new AppException(400, 'Email or Phone number doesnt exits');
      }
      const isEmail = Utils.isEmail(identity);
      const token =
        this.config.get<string>('service.nodeEnv') == 'production'
          ? Utils.generateToke()
          : 123456;
      const saved = await this.cacheManager.set(
        identity,
        token,
        60 * 60 * 1000,
      );

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
      const result = await this.cacheManager.get(payload.identity);
      if (result != payload.code) {
        throw new AppException(400, 'Invalid verification code');
      }
      const user = await this.usersService.findOne({
        $or: [{ email: payload.identity }, { phone: payload.identity }],
      });
      if (!user) {
        throw new AppException(400, 'User not found');
      }

      const hashedPassword = await Utils.hashPassword(payload.password);
      const response = await this.usersService.update(user._id, {
        password: hashedPassword,
      });
      return response;
    } catch (error) {
      console.log(error);

      throw new AppException(400, error);
    }
  }

  async verify(payload: any) {
    let isVerified = false;
    const result = await this.cacheManager.get(payload.identity);
    if (result == payload.code) {
      isVerified = true;
    }
    return { isVerified };
  }
}

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
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService extends BaseService {
  constructor(
    private readonly usersService: UsersService,
    protected jwtService: JwtService,
    protected communicationService: CommunicationService,
    protected config: ConfigService,
    private readonly httpService: HttpService,
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
      const createdUser = await this.usersService.create(payload);

      return await this.usersService.findOneById(createdUser.id);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async login(user: any) {
    try {
      const payload = {
        username: user.email || user.phone,
        sub: user._id,
      };

      return {
        user: user,
        access_token: await this.jwtService.signAsync(payload, {
          secret: this.config.get<string>('app.jwt_secret'),
          expiresIn: this.config.get('app.jwt_expiration'),
        }),
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
        return await this.communicationService.sendNBSSMS({
          phones: [payload],
          message: `Jummai verification code: ${token}`,
        });
      }
    } catch (error) {
      throw new AppException(400, error);
    }
  }

  async getWhatsappToken(phone: string) {
    try {
      const payload = {};

      const user = await this.usersService.findOne({ phone });

      if (!user) {
        throw new AppException(400, 'Phone number doesnt exits');
      }

      const token =
        this.config.get<string>('service.nodeEnv') == 'production'
          ? Utils.generateToke()
          : 123456;
      const saved = await this.cacheManager.set(phone, token, 60 * 60 * 1000);
      // const url =
      //   `https://graph.facebook.com/${apiVersion}/${wabaID}/message_templates` +
      //   `?access_token=${accessToken}`;
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

  async verifyPhone(payload: any) {
    let isVerified = false;
    const result = await this.cacheManager.get(payload.phone);
    if (result == payload.code) {
      await this.usersService.update(payload.userId, { isPhoneVerified: true });
      isVerified = true;
    }
    return { isVerified };
  }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  Next,
} from '@nestjs/common';
import { ApiConsumes, ApiProduces, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { NextFunction } from 'express';
import { RegisterAuthDto } from '../dto/register-auth.dto';
import { LoginAuthDto } from '../dto/login-auth.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
@ApiTags('Auth')
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() payload: RegisterAuthDto,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const user = await this.authService.register(payload);
      const value = await this.authService.login(user);
      const response = await this.authService.getResponse({
        code: 201,
        token: value.access_token,
        value: value.user,
        message: 'Registration was successful',
      });
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() payload: LoginAuthDto,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.authService.login(req.user);

      const response = await this.authService.getResponse({
        code: 200,
        token: value.access_token,
        value: value.user,
        message: 'Login was successful',
      });

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  @Post('/verify')
  @HttpCode(HttpStatus.OK)
  async verification(
    @Body() payload: any,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.authService.verify(payload);
      const response = await this.authService.getResponse({
        code: 200,
        value: value,
        message: 'Verification was successful',
      });
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  @Get('/:identity/get-token')
  @HttpCode(HttpStatus.OK)
  async getToken(
    @Param('identity') identity: string,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.authService.getToken(identity);
      const response = await this.authService.getResponse({
        code: 200,
        value,
        message: 'Get token was successful',
      });
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Patch('/verify-phone')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async verifyPhone(
    @Body() payload: any,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      Object.assign(payload, { userId: req.user._id });
      const value = await this.authService.verifyPhone(payload);
      const response = await this.authService.getResponse({
        code: 200,
        value,
        message: 'Phone number verification was successful',
      });
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Patch('/:identity/reset-password')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('identity') identity: string,
    @Body() payload: any,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      Object.assign(payload, { identity });
      const value = await this.authService.resetPassword(payload);
      const response = await this.authService.getResponse({
        code: 200,
        value,
        message: 'Reset password was successful',
      });
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

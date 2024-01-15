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

@Controller('auth')
@ApiTags('Auth')
@ApiConsumes('application/json')
@ApiProduces('application/json')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createAuthDto: CreateAuthDto,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.authService.register(createAuthDto);
      const response = await this.authService.getResponse({
        code: 201,
        value: value,
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
    @Body() createAuthDto: CreateAuthDto,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.authService.login(req.user);
      console.log(value);

      const response = await this.authService.getResponse({
        code: 200,
        token: value.access_token,
        value: value.user,
        message: 'Login was successful',
      });
      console.log(response, 'response');

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

  @Patch('/reset-password')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() payload: any,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
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

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
      const response = await this.authService.register(createAuthDto);
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
      console.log(req.user._id);

      const response = await this.authService.login(req.user);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  @Get('/:token')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('token') token: string,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    return this.authService.verify(token);
  }

  @Patch('/:identity/get-token')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('identity') identity: string,
    @Body() updateAuthDto: UpdateAuthDto,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const response = await this.authService.getToken(identity);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

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
  register(
    @Body() createAuthDto: CreateAuthDto,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    return this.authService.register(createAuthDto);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  login(
    @Body() createAuthDto: CreateAuthDto,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    return this.authService.login(createAuthDto);
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

  @Patch('/:id/reset-password')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: string,
    @Body() updateAuthDto: UpdateAuthDto,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    return this.authService.resetPassword(+id, updateAuthDto);
  }
}

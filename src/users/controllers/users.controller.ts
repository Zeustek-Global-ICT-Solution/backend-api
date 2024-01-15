/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Next,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { NextFunction } from 'express';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    const value = await this.usersService.create(createUserDto);
    const response = await this.usersService.getResponse({
      code: 201,
      value: value,
      message: 'Create user was successful',
    });
    return res.status(201).json(response);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req, @Res() res, @Next() next: NextFunction) {
    const value = await this.usersService.findAll();
    const response = await this.usersService.getResponse({
      code: 200,
      value: value,
      message: 'Find all users was successful',
    });
    return res.status(200).json(response);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id') id: string,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    const value = await this.usersService.findOneById(id);
    const response = await this.usersService.getResponse({
      code: 200,
      value: value,
      message: 'Find user was successful',
    });
    return res.status(200).json(response);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    const value = await this.usersService.update(id, updateUserDto);
    const response = await this.usersService.getResponse({
      code: 200,
      value: value,
      message: 'Update user was successful',
    });
    return res.status(200).json(response);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id') id: string,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    const value = await this.usersService.remove(id);
    const response = await this.usersService.getResponse({
      code: 200,
      value: value,
      message: 'Remove user was successful',
    });
    return res.status(200).json(response);
  }
}

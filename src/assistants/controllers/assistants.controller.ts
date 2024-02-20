import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Next,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AssistantsService } from '../services/ssistants.service';
import { NextFunction } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('assistants')
export class AssistantsController {
  constructor(private readonly service: AssistantsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() payload: any,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      Object.assign(payload, { user: req.user._id });
      const value = await this.service.create(payload);
      const response = await this.service.getResponse({
        code: 201,
        value: value,
        message: 'Create assistant was successful',
      });
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Post('/whatsapp/webhook')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async webhook(
    @Body() payload: any,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.service.handleWebhook(payload);
      const response = await this.service.getResponse({
        code: 201,
        value: value,
        message: 'Create assistant was successful',
      });
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req, @Res() res, @Next() next: NextFunction) {
    try {
      const value = await this.service.findAll();
      const response = await this.service.getResponse({
        code: 200,
        value: value,
        message: 'Find all assistants was successful',
      });
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('id') id: string,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.service.findOneById(id);
      const response = await this.service.getResponse({
        code: 200,
        value: value,
        message: 'Find assistant was successful',
      });
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() payload: any,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.service.update(id, payload);
      const response = await this.service.getResponse({
        code: 200,
        value: value,
        message: 'Update assistant was successful',
      });
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id') id: string,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.service.remove(id);
      const response = await this.service.getResponse({
        code: 200,
        value: value,
        message: 'Remove assistant was successful',
      });
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

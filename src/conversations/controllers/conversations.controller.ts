/* eslint-disable @typescript-eslint/no-unused-vars */
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
import {
  Controller,
  Post,
  Body,
  Next,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ConversationsService } from '../services/conversations.service';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { NextFunction } from 'express';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() payload: CreateConversationDto,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      if (res.user) {
        Object.assign(payload, { user: res.user._id });
      }
      const value = await this.conversationsService.create(payload);
      const response = await this.conversationsService.getResponse({
        code: 201,
        value: value,
        message: 'Conversation create was successful',
      });
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Post('/completion')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async completion(
    @Body() payload: any,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.conversationsService.completions(payload);
      const response = await this.conversationsService.getResponse({
        code: 201,
        value: value,
        message: 'Chat Completion was successful',
      });
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Post('/image-generator')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async imageGenerator(
    @Body() payload: any,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.conversationsService.imageGenerator(payload);
      const response = await this.conversationsService.getResponse({
        code: 201,
        value: value,
        message: 'Image generator was successful',
      });
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Post('/speech-text')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async speechText(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: any,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.conversationsService.speechToText({
        file,
        ...payload,
      });
      const response = await this.conversationsService.getResponse({
        code: 201,
        value: value,
        message: 'Speech to text generator was successful',
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
      const value = await this.conversationsService.findAll();
      const response = await this.conversationsService.getResponse({
        code: 200,
        value: value,
        message: 'Find all conversations was successful',
      });
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Get('/users')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async findUser(@Req() req, @Res() res, @Next() next: NextFunction) {
    try {
      const value = await this.conversationsService.findAll({
        userId: req.user._id,
      });
      const response = await this.conversationsService.getResponse({
        code: 200,
        value: value,
        message: 'Find all conversations was successful',
      });
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param('id') id: string,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.conversationsService.findOne(id);
      const response = await this.conversationsService.getResponse({
        code: 200,
        value: value,
        message: 'Find all conversations was successful',
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
      const value = await this.conversationsService.update(id, payload);
      const response = await this.conversationsService.getResponse({
        code: 200,
        value: value,
        message: 'Update conversation was successful',
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
      const value = await this.conversationsService.remove(id);
      const response = await this.conversationsService.getResponse({
        code: 200,
        value: value,
        message: 'Remove conversation was successful',
      });
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

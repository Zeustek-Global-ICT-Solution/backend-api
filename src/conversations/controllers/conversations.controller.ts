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
import { ConversationsService } from '../services/conversations.service';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { NextFunction } from 'express';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post('/completion')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createConversationDto: CreateConversationDto,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.conversationsService.completions(
        createConversationDto,
      );
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
}

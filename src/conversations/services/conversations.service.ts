/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { UpdateConversationDto } from '../dto/update-conversation.dto';
import { OpenAIService } from '@app/shared/openai/services/openai.service';
import { AppException } from '@app/shared';
import { BaseService } from '@app/shared/base/base.service';
import { ConversationsRepository } from '../repositories/converstion.repository';

@Injectable()
export class ConversationsService extends BaseService {
  constructor(
    private readonly openAIService: OpenAIService,
    private readonly conversationsRepository: ConversationsRepository,
  ) {
    super();
  }

  public async create(payload: any) {
    try {
      return await this.openAIService.chatCompletion(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async findAll(payload: any = {}) {
    try {
      return await this.conversationsRepository.find(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async findOne(id: string, payload: any = {}) {
    try {
      return await this.conversationsRepository.findById(id);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async update(id: string, payload: any) {
    try {
      return await this.conversationsRepository.updateOne({ _id: id }, payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async remove(id: string) {
    try {
      return await this.conversationsRepository.remove({ _id: id });
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async completions(payload: any) {
    try {
      return await this.openAIService.chatCompletion(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async imageGenerator(payload: any) {
    try {
      const result = await this.openAIService.imageGenerator(payload);
      if (!result) throw new AppException(400, 'bad image generator');
      return result;
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async speechToText(payload: any) {
    try {
      return await this.openAIService.speechToText(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }
}

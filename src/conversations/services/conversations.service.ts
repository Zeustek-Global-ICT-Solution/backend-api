import { ResponsesService } from './../../responses/services/responses.service';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { OpenAIService } from '@app/shared/openai/services/openai.service';
import { AppException } from '@app/shared';
import { BaseService } from '@app/shared/base/base.service';
import { ConversationsRepository } from '../repositories/converstion.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PromptsService } from 'src/prompts/services/prompts.service';
import { CreatePromptEvent } from '@app/shared/schemas/conversation/create-prompt.event';

@Injectable()
export class ConversationsService extends BaseService {
  constructor(
    private readonly openAIService: OpenAIService,
    private readonly promptsService: PromptsService,
    private readonly responsesService: ResponsesService,
    private readonly repository: ConversationsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {
    super();
  }

  public async create(payload: any) {
    try {
      return await this.repository.create(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async findAll(payload: any = {}) {
    try {
      return await this.repository.findAllAndPopulate(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async findOne(id: string, payload: any = {}) {
    try {
      return await this.repository.findById(id);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async findConversationPrompts(id: string, payload: any = {}) {
    try {
      return await this.promptsService.findAll({ conversation: id });
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async update(id: string, payload: any) {
    try {
      return await this.repository.updateOne({ _id: id }, payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async remove(id: string) {
    try {
      return await this.repository.remove({ _id: id });
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async completions(payload: any) {
    try {
      // TODO: get conversation with given id
      const conversation = await this.repository.findById(payload.conversation);
      if (!conversation) {
        throw new AppException(400, 'Resource not found');
      }
      // TODO: Call openai api
      const result = await this.openAIService.chatCompletion(payload);
      //create prompt
      const prompt = await this.promptsService.create({
        conversation: payload.conversation,
        content: payload.content,
        type: payload.type,
        user: payload.user,
      });

      // TODO: Create response of the result from openai
      await this.responsesService.create({
        conversation: payload.conversation,
        user: payload.user,
        content: result.choices[0].message.content,
        prompt: prompt.id,
        type: payload.type,
      });

      // TODO: Update the conversation title if default to 'New conversation'
      if (conversation.title === 'New Conversation') {
        conversation.title = payload.content;
        await conversation.save();
      }

      // TODO: Get and return the update prompt
      return await this.promptsService.findOneByIdAndPopulate(prompt.id);
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

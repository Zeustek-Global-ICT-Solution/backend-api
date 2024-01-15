/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateConversationDto } from '../dto/create-conversation.dto';
import { UpdateConversationDto } from '../dto/update-conversation.dto';
import { OpenAIService } from '@app/shared/openai/services/openai.service';
import { AppException } from '@app/shared';
import { BaseService } from '@app/shared/base/base.service';

@Injectable()
export class ConversationsService extends BaseService {
  constructor(private readonly openAIService: OpenAIService) {
    super();
  }

  public async completions(payload: any) {
    try {
      return await this.openAIService.chatCompletion(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }
}

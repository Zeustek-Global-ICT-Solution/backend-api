/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { BaseService } from '@app/shared/base/base.service';
import { AssistantsRepository } from '../repository/assistant.repository';
import { AppException } from '@app/shared';
import {
  CreatedModel,
  RemovedModel,
  UpdatedModel,
} from 'nestjs-mongoose-generic-repository';
import { AssistantDocument } from '@app/shared/schemas';
import { OpenAIService } from '@app/shared/openai/services/openai.service';

import { UsersService } from 'src/users/services/users.service';
import { Buffer, Blob } from 'buffer';

@Injectable()
export class AssistantsService extends BaseService {
  constructor(
    private readonly repository: AssistantsRepository,
    private readonly usersService: UsersService,
    private readonly openAIService: OpenAIService,
  ) {
    super();
  }

  async create(payload: any): Promise<CreatedModel> {
    try {
      // Get the user information

      const user = await this.usersService.findOne(payload.user);
      const file = await this.generateAndUploadFile(
        JSON.stringify(user.productOrServices),
      );
      console.log(file, JSON.stringify(user.productOrServices));
      if (!user.isWhatsAppConneted) {
        throw new AppException(400, 'Whatsapp account not connected');
      }

      // Generate file with retrived user information
      // const file = await this.generateAndUploadFile(
      //   JSON.stringify(user.businessDescription),
      // );

      Object.assign(payload, { file });

      // Create openai assistance
      const assistant = await this.openAIService.createAssistant(payload);

      Object.assign(payload, {
        name: assistant.name,
        assistantId: assistant.id,
        description: assistant.description,
        instructions: assistant.instructions,
        metadata: assistant.metadata,
        fileIds: assistant.file_ids,
      });

      // Save the Assistant information on the database
      return await this.repository.create(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async findAll(
    payload: Record<string, any> = {},
  ): Promise<AssistantDocument[]> {
    try {
      return await this.repository.find(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async findOneById(id: string): Promise<AssistantDocument> {
    try {
      const user = await this.repository.findById(id);
      return user;
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async findOne(payload: Record<string, any>): Promise<AssistantDocument> {
    try {
      const result = await this.repository.find(payload);
      if (result && result.length > 0) {
        return result[0];
      }
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async update(id: string, payload: any): Promise<UpdatedModel> {
    try {
      return await this.repository.updateOne({ _id: id }, payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async remove(id: string): Promise<RemovedModel> {
    try {
      return await this.repository.remove({ _id: id });
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async uploadAssistantFile(payload: any): Promise<any> {
    try {
      const file = await this.generateAndUploadFile(payload);
      return await this.openAIService.uploadFile({ file: file });
    } catch (error) {
      throw new AppException(400, 'Error generatings file');
    }
  }

  private async generateAndUploadFile(content: string): Promise<any> {
    const blob = new Blob(['ali'], { type: 'text/plain' });
    const b: any = blob;

    b.lastModifiedDate = new Date();
    b.name = 'assistant.txt';

    return b as File;
  }
}

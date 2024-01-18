import { Injectable } from '@nestjs/common';
import { PromptsRepository } from '../repository/prompt.repository';
import { BaseService } from '@app/shared/base/base.service';
import {
  CreatedModel,
  RemovedModel,
  UpdatedModel,
} from 'nestjs-mongoose-generic-repository';
import { AppException } from '@app/shared';
import { PromptDocument } from '@app/shared/schemas';
import { OnEvent } from '@nestjs/event-emitter';
import { CreatePromptEvent } from '@app/shared/schemas/conversation/create-prompt.event';

@Injectable()
export class PromptsService extends BaseService {
  constructor(private readonly repository: PromptsRepository) {
    super();
  }

  async create(payload: any): Promise<CreatedModel> {
    try {
      return await this.repository.create(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async findAll(payload: Record<string, any> = {}): Promise<PromptDocument[]> {
    try {
      return await this.repository.findAndPopulated(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async findOneById(id: string): Promise<PromptDocument> {
    try {
      return (await this.repository.findById(id)).populate('response');
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }
  async findOneByIdAndPopulate(id: string): Promise<PromptDocument> {
    try {
      return await this.repository.findOneByIdAndPopulate(id);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async findOne(payload: Record<string, any>): Promise<PromptDocument> {
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

  @OnEvent('prompt.created', { async: true, promisify: true })
  handlePromptCreatedEvent(event: CreatePromptEvent) {
    // handle and process "OrderCreatedEvent" event
    console.log(event);
  }
}

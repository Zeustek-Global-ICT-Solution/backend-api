import { Injectable } from '@nestjs/common';
import { MessagesRepository } from '../repository/message.repository';
import { BaseService } from '@app/shared/base/base.service';
import { AppException } from '@app/shared';
import {
  CreatedModel,
  RemovedModel,
  UpdatedModel,
} from 'nestjs-mongoose-generic-repository';
import { MessageDocument } from '@app/shared/schemas';

@Injectable()
export class MessagesService extends BaseService {
  constructor(private readonly repository: MessagesRepository) {
    super();
  }

  async create(payload: any): Promise<CreatedModel> {
    try {
      return await this.repository.create(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async findAll(payload: Record<string, any> = {}): Promise<MessageDocument[]> {
    try {
      return await this.repository.find(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async findOneById(id: string): Promise<MessageDocument> {
    try {
      const user = await this.repository.findById(id);
      return user;
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async findOne(payload: Record<string, any>): Promise<MessageDocument> {
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
}

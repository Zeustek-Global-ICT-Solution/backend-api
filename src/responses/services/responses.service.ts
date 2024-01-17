import { BaseService } from '@app/shared/base/base.service';
import { Injectable } from '@nestjs/common';
import { ReponsesRepository } from '../repository/response.repository';
import {
  CreatedModel,
  RemovedModel,
  UpdatedModel,
} from 'nestjs-mongoose-generic-repository';
import { AppException } from '@app/shared';
import { ResponseDocument } from '@app/shared/schemas';

@Injectable()
export class ResponsesService extends BaseService {
  constructor(private readonly repository: ReponsesRepository) {
    super();
  }

  async create(payload: any): Promise<CreatedModel> {
    try {
      return await this.repository.create(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async findAll(
    payload: Record<string, any> = {},
  ): Promise<ResponseDocument[]> {
    try {
      return await this.repository.find(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async findOneById(id: string): Promise<ResponseDocument> {
    try {
      const user = await this.repository.findById(id);
      return user;
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async findOne(payload: Record<string, any>): Promise<ResponseDocument> {
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

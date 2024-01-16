/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersRepository } from '../repository/user.repository';
import {
  CreatedModel,
  RemovedModel,
  UpdatedModel,
} from 'nestjs-mongoose-generic-repository';
import { User, UserDocument } from '@app/shared/schemas';
import { BaseService } from '@app/shared/base/base.service';
import { AppException } from '@app/shared';

@Injectable()
export class UsersService extends BaseService {
  constructor(private readonly usersRepository: UsersRepository) {
    super();
  }

  async create(createUserDto: CreateUserDto): Promise<CreatedModel> {
    try {
      return await this.usersRepository.create(createUserDto);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.findAll();
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async findOneById(id: string): Promise<UserDocument> {
    try {
      const user = await this.usersRepository.findById(id);
      return user;
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async findOne(payload: Record<string, any>): Promise<UserDocument> {
    try {
      const result = await this.usersRepository.find(payload);
      if (result && result.length > 0) {
        return result[0];
      }
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdatedModel> {
    try {
      return await this.usersRepository.updateOne({ _id: id }, updateUserDto);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  async remove(id: string): Promise<RemovedModel> {
    try {
      return await this.usersRepository.remove({ _id: id });
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }
}

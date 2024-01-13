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
import { User } from '@app/shared/schemas';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<CreatedModel> {
    return this.usersRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findOneById(id: string): Promise<User> {
    return this.usersRepository.findById(id);
  }

  async findOne(payload: Record<string, any>): Promise<User> {
    const result = await this.usersRepository.find(payload);
    if (result && result.length > 0) {
      return result[0];
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdatedModel> {
    return this.usersRepository.updateOne({ _id: id }, updateUserDto);
  }

  async remove(id: string): Promise<RemovedModel> {
    return this.usersRepository.remove({ _id: id });
  }
}

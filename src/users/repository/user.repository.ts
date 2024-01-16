import { User, UserDocument } from '@app/shared/schemas';
import { Injectable } from '@nestjs/common';
import { Repository } from 'nestjs-mongoose-generic-repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersRepository extends Repository<UserDocument> {
  constructor(@InjectModel(User.name) private entity: Model<UserDocument>) {
    super(entity);
  }

  public async findWithSelectedFields(conditions: Record<string, any> = {}) {
    return await this.entity.find(conditions).select('-password').exec();
  }
}

import { Repository } from 'nestjs-mongoose-generic-repository';
import { Document } from 'mongoose';
import { Model } from 'mongoose';

export class BaseRepository<
  T extends Document<any, any, any>,
> extends Repository<T> {
  constructor(private entity: Model<T>) {
    super(entity);
  }
}

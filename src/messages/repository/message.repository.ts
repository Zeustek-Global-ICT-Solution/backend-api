import { Message, MessageDocument } from '@app/shared/schemas';
import { Injectable } from '@nestjs/common';
import { Repository } from 'nestjs-mongoose-generic-repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MessagesRepository extends Repository<MessageDocument> {
  constructor(
    @InjectModel(Message.name) private entity: Model<MessageDocument>,
  ) {
    super(entity);
  }
}

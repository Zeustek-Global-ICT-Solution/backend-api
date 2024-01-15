import { Conversation, ConversationDocument } from '@app/shared/schemas';
import { Injectable } from '@nestjs/common';
import { Repository } from 'nestjs-mongoose-generic-repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ConversationsRepository extends Repository<ConversationDocument> {
  constructor(
    @InjectModel(Conversation.name) private entity: Model<ConversationDocument>,
  ) {
    super(entity);
  }
}

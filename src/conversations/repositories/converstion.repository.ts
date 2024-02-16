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

  /**
   *
   * @param payload filter queries
   * @returns onject
   */
  async findAllAndPopulate(payload) {
    return await this.entity
      .find(payload)
      .populate('user', '-password')
      .populate({
        path: 'prompts',
        populate: [
          {
            path: 'user',
            select: '-password',
          },
          {
            path: 'response',
          },
        ],
      })
      .exec();
  }

  /**
   *
   * @param payload
   * @returns object
   */
  async findOneAndPopulate(payload) {
    return await this.entity
      .findById(payload)
      .populate('user', '-password')
      .populate({
        path: 'prompts',
        populate: [
          {
            path: 'user',
            select: '-password',
          },
          {
            path: 'response',
          },
        ],
      })
      .exec();
  }
}

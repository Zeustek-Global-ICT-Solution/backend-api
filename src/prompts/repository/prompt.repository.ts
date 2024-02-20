import { Prompt, PromptDocument } from '@app/shared/schemas';
import { Injectable } from '@nestjs/common';
import { Repository } from 'nestjs-mongoose-generic-repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PromptsRepository extends Repository<PromptDocument> {
  constructor(@InjectModel(Prompt.name) private entity: Model<PromptDocument>) {
    super(entity);
  }

  // TODO: find one and populate
  async findOneByIdAndPopulate(id: string) {
    return await this.entity
      .findById(id)
      .populate('user', '-password')
      .populate('response')
      .exec();
  }

  // TODO: Find all prompts and populate
  async findAndPopulated(payload: Record<string, any>) {
    return await this.entity
      .find(payload)
      .populate('user', '-password')
      .populate('conversation')
      .populate('response')
      .limit(10)
      .exec();
  }
}

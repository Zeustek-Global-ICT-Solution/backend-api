import { Assistant, AssistantDocument } from '@app/shared/schemas';
import { Injectable } from '@nestjs/common';
import { Repository } from 'nestjs-mongoose-generic-repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AssistantsRepository extends Repository<AssistantDocument> {
  constructor(
    @InjectModel(Assistant.name)
    private entity: Model<AssistantDocument>,
  ) {
    super(entity);
  }
}

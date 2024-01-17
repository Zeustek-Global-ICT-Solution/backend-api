import { Response, ResponseDocument } from '@app/shared/schemas';
import { Injectable } from '@nestjs/common';
import { Repository } from 'nestjs-mongoose-generic-repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReponsesRepository extends Repository<ResponseDocument> {
  constructor(
    @InjectModel(Response.name) private entity: Model<ResponseDocument>,
  ) {
    super(entity);
  }
}

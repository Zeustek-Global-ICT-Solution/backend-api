import { Types } from 'mongoose';
/* eslint-disable @typescript-eslint/no-this-alias */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssistantDocument = Assistant & Document;

@Schema({
  collection: 'assistants',
  timestamps: true,
  toJSON: { virtuals: true },
})
export class Assistant {
  @Prop({
    type: 'string',
    required: false,
  })
  assistantId: string;

  @Prop({
    type: 'string',
    required: false,
  })
  name: string;

  @Prop({
    type: 'string',
    required: false,
  })
  description: string;

  @Prop({
    type: 'string',
    required: false,
  })
  instruction: string;

  @Prop({
    type: 'string',
    required: false,
  })
  metadata: string;

  @Prop({
    type: ['string'],
    required: false,
  })
  fileIds: string[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const AssistantSchema = SchemaFactory.createForClass(Assistant);

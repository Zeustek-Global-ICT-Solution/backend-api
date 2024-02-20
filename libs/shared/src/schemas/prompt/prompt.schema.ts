/* eslint-disable @typescript-eslint/no-this-alias */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type PromptDocument = Prompt & Document;

@Schema({ collection: 'prompts', timestamps: true, toJSON: { virtuals: true } })
export class Prompt {
  @Prop({
    type: 'string',
    required: false,
  })
  content: string;

  @Prop({
    type: 'string',
    required: false,
  })
  image: string;

  @Prop({
    type: 'string',
    enum: ['text', 'image', 'voice'],
    default: 'text',
  })
  type: string;

  @Prop({
    type: 'string',
    required: false,
  })
  audio: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Conversation' })
  conversation: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}

export const PromptSchema = SchemaFactory.createForClass(Prompt);

PromptSchema.virtual('response', {
  ref: 'Response',
  localField: '_id',
  foreignField: 'prompt',
});

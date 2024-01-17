/* eslint-disable @typescript-eslint/no-this-alias */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Conversation } from '../conversation';
import { User } from '../users';

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
    enum: ['text', 'image', 'audio'],
    default: 'text',
  })
  type: string;

  @Prop({
    type: 'string',
    required: false,
  })
  audio: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Conversation' })
  conversation: Conversation;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const PromptSchema = SchemaFactory.createForClass(Prompt);

PromptSchema.virtual('response', {
  ref: 'Response',
  localField: '_id',
  foreignField: 'prompt',
});

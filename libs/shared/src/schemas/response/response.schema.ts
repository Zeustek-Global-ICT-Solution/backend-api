/* eslint-disable @typescript-eslint/no-this-alias */
import { Conversation, Prompt } from '@app/shared/schemas';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from '../users';

export type ResponseDocument = Response & Document;

@Schema({
  collection: 'responses',
  timestamps: true,
  toJSON: { virtuals: true },
})
export class Response {
  @Prop({
    type: 'string',
    required: false,
  })
  content: string;

  @Prop({
    type: ['string'],
    required: false,
  })
  images: Types.Array<string>;

  @Prop({
    type: 'string',
    required: false,
  })
  audio: string;

  @Prop({
    type: 'string',
    enum: ['text', 'image', 'audio'],
    default: 'text',
  })
  type: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Prompt' })
  prompt: Prompt;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Conversation' })
  conversation: Conversation;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);

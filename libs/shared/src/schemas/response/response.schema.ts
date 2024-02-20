/* eslint-disable @typescript-eslint/no-this-alias */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

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
    enum: ['text', 'image', 'voice'],
    default: 'text',
  })
  type: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Prompt' })
  prompt: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Conversation' })
  conversation: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);

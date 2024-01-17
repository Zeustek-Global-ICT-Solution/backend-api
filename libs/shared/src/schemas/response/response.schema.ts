/* eslint-disable @typescript-eslint/no-this-alias */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ResponseDocument = Response & Document;

@Schema({ collection: 'responses', timestamps: true })
export class Response {
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
    required: false,
  })
  audio: string;

  @Prop({
    type: 'string',
    enum: ['text', 'image', 'audio'],
    default: 'text',
  })
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'Prompt' })
  promptId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Conversation' })
  conversationId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const ResponseSchema = SchemaFactory.createForClass(Response);

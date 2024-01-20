import { Types, Schema as MongooseSchema } from 'mongoose';
/* eslint-disable @typescript-eslint/no-this-alias */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ collection: 'messages', timestamps: true })
export class Message {
  @Prop({
    type: 'string',
    required: false,
  })
  content: string;

  @Prop({
    type: 'string',
    enum: ['text', 'image'],
    default: 'text',
  })
  type: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

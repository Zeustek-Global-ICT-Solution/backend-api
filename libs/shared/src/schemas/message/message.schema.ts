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
  type: any;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

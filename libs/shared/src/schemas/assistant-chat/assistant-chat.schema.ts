/* eslint-disable @typescript-eslint/no-this-alias */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssistantChatDocument = AssistantChat & Document;

@Schema({ collection: 'assistantChats', timestamps: true })
export class AssistantChat {
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

export const AssistantChatSchema = SchemaFactory.createForClass(AssistantChat);

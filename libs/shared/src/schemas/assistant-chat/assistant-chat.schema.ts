import { Types } from 'mongoose';
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
  user: string;

  @Prop({
    type: 'string',
    required: false,
  })
  messages: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const AssistantChatSchema = SchemaFactory.createForClass(AssistantChat);

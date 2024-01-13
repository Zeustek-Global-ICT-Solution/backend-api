/* eslint-disable @typescript-eslint/no-this-alias */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema({ collection: 'conversations', timestamps: true })
export class Conversation {
  @Prop({
    type: 'string',
    required: false,
  })
  firstName: string;

  @Prop({
    type: 'string',
    required: false,
  })
  lastName: string;

  @Prop({
    type: 'string',
    required: false,
  })
  phone: string;

  @Prop({
    type: 'string',
    required: false,
  })
  email: string;

  @Prop({
    type: 'string',
    required: true,
  })
  password: string;

  @Prop({
    type: 'string',
    required: false,
  })
  deviceToken: string;

  @Prop({
    type: 'string',
    required: false,
  })
  profileImage: string;

  @Prop({
    type: 'string',
    required: false,
  })
  refreshToken: string;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

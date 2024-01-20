import { Types } from 'mongoose';
/* eslint-disable @typescript-eslint/no-this-alias */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema({
  collection: 'conversations',
  timestamps: true,
  toJSON: { virtuals: true },
})
export class Conversation {
  @Prop({
    type: 'string',
    required: false,
    default: 'New conversation',
  })
  title: string;

  @Prop({
    type: 'string',
    enum: ['text', 'image', 'voice'],
    default: 'text',
  })
  type: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

ConversationSchema.virtual('prompts', {
  ref: 'Prompt',
  localField: '_id',
  foreignField: 'conversation',
});

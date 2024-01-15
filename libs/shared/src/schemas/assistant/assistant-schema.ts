/* eslint-disable @typescript-eslint/no-this-alias */
import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssistantDocument = Assistant & Document;

@Schema({ collection: 'assistants', timestamps: true })
export class Assistant {
  @Prop({
    type: 'string',
    required: false,
  })
  name: string;

  @Prop({
    type: 'string',
    required: false,
  })
  description: string;

  @Prop({
    type: 'string',
    required: false,
  })
  assistantId: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const AssistantSchema = SchemaFactory.createForClass(Assistant);

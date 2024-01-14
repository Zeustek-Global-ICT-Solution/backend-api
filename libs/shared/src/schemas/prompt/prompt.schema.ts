/* eslint-disable @typescript-eslint/no-this-alias */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type propmtDocument = Prompt & Document;

@Schema({ collection: 'prompts', timestamps: true })
export class Prompt {
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

export const PromptSchema = SchemaFactory.createForClass(Prompt);

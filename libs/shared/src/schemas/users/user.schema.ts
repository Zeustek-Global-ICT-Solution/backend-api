import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  deviceToken: string;

  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

/* eslint-disable @typescript-eslint/no-this-alias */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({ collection: 'users', timestamps: true })
export class User {
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

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

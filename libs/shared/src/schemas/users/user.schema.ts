/* eslint-disable @typescript-eslint/no-this-alias */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({ collection: 'users', timestamps: true, toJSON: { virtuals: true } })
export class User {
  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  firstName: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  lastName: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  about: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  phone: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  gender: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  email: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  primaryLanguage: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  businessName: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  businessPhone: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  businessDescription: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  businessType: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  preferredCommunicationLanguage: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  customerDemographics: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  customerLanguageCommunicationPreference: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  BusinessAddress: string;

  @Prop({
    type: [
      {
        title: 'string',
        price: 'number',
        discount: 'number',
        size: 'number',
        unit: 'string',
        afterDiscount: 'number',
      },
    ],
    required: false,
    default: null,
  })
  productOrServices: {
    title: string;
    price: number;
    discount: number;
    size: number;
    unit: string;
    afterDiscount: number;
  }[];

  @Prop({
    type: 'string',
    required: true,
    default: null,
  })
  password: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  deviceToken: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  profileImage: string;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  refreshToken: string;

  @Prop({
    type: 'boolean',
    required: false,
    default: false,
  })
  isWhatsAppConneted: boolean;

  @Prop({
    type: 'boolean',
    required: false,
    default: false,
  })
  disabled: boolean;

  @Prop({
    type: 'boolean',
    required: false,
    default: false,
  })
  isPhoneVerified: boolean;

  @Prop({
    type: 'string',
    required: false,
    default: null,
  })
  whatsAppAccessToken: string;

  @Prop({
    type: 'boolean',
    required: false,
    default: true,
  })
  isFirstLogin: boolean;
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

UserSchema.virtual('responses', {
  ref: 'Response',
  localField: '_id',
  foreignField: 'userId',
});

UserSchema.virtual('isPersonalInfoCompleted').get(function () {
  return (
    this.firstName != null &&
    this.lastName != null &&
    this.phone != null &&
    this.email != null
  );
});

UserSchema.virtual('isCompanyInfoCompleted').get(function () {
  return (
    this.businessName != null &&
    this.businessDescription != null &&
    this.businessType != null &&
    this.BusinessAddress != null
  );
});

UserSchema.virtual('isDescriptionCompleted').get(function () {
  return this.businessDescription != null;
});

UserSchema.virtual('isServicesProductsAndPriceCompleted').get(function () {
  return this.productOrServices != null;
});

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail } from 'class-validator';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Otp extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: false, auto: true })
  _id: MongooseSchema.Types.ObjectId;
  @Prop({ required: true })
  otp: number;
  @Prop({ required: true, type: Date })
  expiry: Date;
  @Prop({ required: true, type: String })
  email: string;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);

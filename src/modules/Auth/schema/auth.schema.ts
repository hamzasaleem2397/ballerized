import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { UserRole } from 'src/utils/types';

@Schema()
export class User extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: false, auto: true })
  _id: MongooseSchema.Types.ObjectId;
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @Prop()
  age?: number;
  @Prop({ select: false, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

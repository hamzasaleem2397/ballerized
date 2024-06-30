import { Schema as MongooseSchema } from 'mongoose';

export interface JWT {
  _id: MongooseSchema.Types.ObjectId;
  email: string;
  role: string;
}

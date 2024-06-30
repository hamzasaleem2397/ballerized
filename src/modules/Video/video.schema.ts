import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Video extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: false, auto: true })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  videoTitle: string;
  @Prop({ required: true })
  videoUrl: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);

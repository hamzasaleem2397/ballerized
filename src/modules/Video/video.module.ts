import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoController } from './video.controller';
import { Video, VideoSchema } from './video.schema';
import { VideoService } from './video.service';
import { JwtUserService } from '../jwt/services/jwt-user.service';
import { JwtStrategy } from '../Auth/strategies/jwt.stragety';
import { JwtModule } from '../jwt/jwt.module';
import { User, UserSchema } from '../Auth/schema/auth.schema';

// import { UserSchema } from './schema/auth.schema';
// import { User } from './schema/auth.schema';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
  ],
  controllers: [VideoController],
  providers: [VideoService, JwtStrategy, JwtUserService],
})
export class VideoModule {}

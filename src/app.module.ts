import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/Auth/auth.module';

import { JwtService } from '@nestjs/jwt';
import { JwtModule } from './modules/jwt/jwt.module';
import { CustomConfigModule } from './config/config.module';
import { VideoModule } from './modules/Video/video.module';

@Module({
  imports: [
    AuthModule,
    VideoModule,
    MongooseModule.forRoot(process.env.MONGO_CONNECTION),
    CustomConfigModule,
    JwtModule,
  ],
  providers: [JwtService],
})
export class AppModule {}

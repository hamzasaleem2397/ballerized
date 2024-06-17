import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schema/auth.schema';

import { JwtStrategy } from './strategies/jwt.stragety';
import { JwtModule } from '../jwt/jwt.module';
// import { UserSchema } from './schema/auth.schema';
// import { User } from './schema/auth.schema';

@Module({
  imports: [
    JwtModule,

    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

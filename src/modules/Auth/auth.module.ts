import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User, UserSchema } from './schema/auth.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.stragety';
import { JwtUserService } from '../jwt/services/jwt-user.service';
import { Otp, OtpSchema } from './schema/otp.schema';
// import { UserSchema } from './schema/auth.schema';
// import { User } from './schema/auth.schema';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Otp.name, schema: OtpSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtUserService],
})
export class AuthModule {}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schema/auth.schema';
import { JWT } from 'src/modules/jwt/types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt_user') {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('auth.jwt_secret'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JWT): Promise<{ user: User } | false> {
    console.log('JWT payload:', payload);
    const user = await this.userModel.findById(payload._id).exec();
    if (!user) {
      console.log('User not found');
      return false;
    }
    console.log('User found:', user);
    return { user };
  }
}

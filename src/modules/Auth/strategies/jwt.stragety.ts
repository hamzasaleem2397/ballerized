// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JWT } from 'src/modules/jwt/types';
import { User } from '../schema/auth.schema';

type Return = { user: User } | false;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt_user') {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.jwt_secret'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JWT): Promise<Return> {
    const user = await this.userModel.findOne({ _id: payload._id }).exec();
    if (!user) return false;
    return { user };
  }
}

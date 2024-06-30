import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JWT } from '../types';

@Injectable()
export class JwtUserService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  generateAuthToken(payload: JWT) {
    const secrets = {
      secret: this.configService.get<string>('auth.jwt_secret'),
      expiresIn: this.configService.get<number>('auth.JWT_EXPIRY'),
    };
    const token = this.jwtService.sign(payload, secrets);
    return token;
  }

  async decodeAuthToken(token: string): Promise<JWT> {
    return this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('auth.jwt_secret'),
    });
  }

  // decodeAuthToken(token: string) {
  //   return this.jwtService.decode(token);
  // }
}

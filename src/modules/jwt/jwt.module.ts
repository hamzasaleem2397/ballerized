import { Module } from '@nestjs/common';
import { JwtUserService } from './services/jwt-user.service';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    NestJwtModule.register({
      global: true,
    }),
  ],
  providers: [JwtUserService],
  exports: [JwtUserService],
})
export class JwtModule {}

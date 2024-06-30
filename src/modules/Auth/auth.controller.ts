import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import { AuthorizationHeader } from 'src/utils/types';
import { ApiBearerAuth } from '@nestjs/swagger';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { JwtAuthGuard } from './guard/user.guard';
import { User } from './schema/auth.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSerices: AuthService) {}
  @Post('/signup')
  @UsePipes(ValidationPipe)
  register(@Body() createUserDto: CreateUserDto) {
    // return createUserDto;
    return this.authSerices.register(createUserDto);
  }
  @Post('/login')
  @UsePipes(ValidationPipe)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authSerices.login(loginUserDto);
  }

  @Post('/verifyOtp')
  @ApiBearerAuth(AuthorizationHeader.BEARER)
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto, @Request() { user }: any) {
    return this.authSerices.verifyOtp(verifyOtpDto, user);
  }
}

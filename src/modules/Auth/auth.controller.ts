import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

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
}

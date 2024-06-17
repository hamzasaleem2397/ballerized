// create-user.dto.ts
import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please correct the email format' })
  email: string;

  @IsOptional()
  age?: number;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}

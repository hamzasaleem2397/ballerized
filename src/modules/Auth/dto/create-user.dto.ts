// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsStrongPassword,
  IsEnum,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/utils/types';

export class CreateUserDto {
  @ApiProperty({
    description: 'name of the user',
    example: 'hamza',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'email of the user',
    example: 'hamza@yopmail.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please correct the email format' })
  email: string;

  @ApiProperty({
    description: 'age of the user',
    example: 13,
  })
  @IsOptional()
  age?: number;

  @ApiProperty({
    description: 'role of the user athlete or coach',
    example: 'athlete',
  })
  @IsNotEmpty()
  @IsEnum(UserRole, { message: 'user role can either be athlete or coach' })
  role: UserRole;

  @ApiProperty({
    description: 'pasowwrd of the user',
    example: 'hamza@1234@',
  })
  @IsNotEmpty()
  @MinLength(8, { message: 'minlength is 8' })
  // @IsStrongPassword()
  password: string;
}

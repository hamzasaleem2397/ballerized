// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsStrongPassword, IsEnum } from 'class-validator';
import { UserRole } from 'src/utils/types';

export class LoginUserDto {
  @ApiProperty({
    description: 'name of user',
    example: 'hamza@email.com',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please correct the email format' })
  email: string;

  @ApiProperty({
    description: 'name of user',
    example: '@123123@123',
  })
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}

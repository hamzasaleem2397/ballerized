// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    example: 1234,
  })
  @IsNotEmpty()
  @IsNumber()
  otp: number;
}

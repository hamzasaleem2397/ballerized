// create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VideoDto {
  @ApiProperty({
    example: 'hamza',
  })
  @IsNotEmpty()
  videoTitle: string;

  @ApiProperty({
    example: 'hamza',
  })
  @IsNotEmpty()
  videoUrl: string;
}

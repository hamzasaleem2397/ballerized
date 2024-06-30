import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { VideoDto } from './dto/video.dto';
import { VideoService } from './video.service';
import { JwtAuthGuard } from '../Auth/guard/user.guard';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthorizationHeader } from 'src/utils/types';

@ApiBearerAuth(AuthorizationHeader.BEARER)
@ApiTags('videos')
@Controller('videos')
export class VideoController {
  constructor(private readonly videoSerices: VideoService) {}

  @Post('/video')
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard)
  video(@Body() createUserDto: VideoDto, @Request() { user }: any) {
    // return createUserDto;
    return this.videoSerices.video(createUserDto, user);
  }
  @Get('/video')
  // @UsePipes(ValidationPipe)
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @UseGuards(JwtAuthGuard)
  gvideo(@Query('page') page: number, @Query('limit') limit: number) {
    return this.videoSerices.gvideo(page, limit);
  }
  // @UsePipes(ValidationPipe)
  @Put('/video')
  @ApiParam({ name: 'id', required: true, description: 'id' })
  @UseGuards(JwtAuthGuard)
  updateVideo(@Param('id') id: number) {
    return this.videoSerices.updateVideo(id);
  }
  @Delete('/video')
  @ApiParam({ name: 'id', required: true, description: 'id' })
  @UseGuards(JwtAuthGuard)
  deleteVideo(@Param('id') id: number) {
    return this.videoSerices.deleteVideo(id);
  }
}

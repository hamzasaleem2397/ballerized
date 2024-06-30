import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtUserService } from '../jwt/services/jwt-user.service';
import { VideoDto } from './dto/video.dto';
import { Video } from './video.schema';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<Video>,
  ) {}
  async video(videoDto: VideoDto, userData: any): Promise<Video> {
    const videoData = new this.videoModel({
      ...videoDto,
      userId: userData?.id,
    });
    const videoExist = await this.videoModel.findOne({
      videoTitle: videoDto.videoTitle,
    });
    if (videoExist) {
      throw new HttpException('Video Already Exist', HttpStatus.CONFLICT);
    }
    return videoData.save();
  }
  async gvideo(page: number, limit: number): Promise<Video> {
    console.log(page, limit);
    const count = await this.videoModel.countDocuments({}).exec();
    const page_total = Math.floor((count - 1) / limit) + 1;
    const offset = (page - 1) * limit;
    const videoArray = await this.videoModel
      .find()
      .skip(offset)
      .limit(limit)
      .exec();

    return { videoArray, page_total } as any;
  }
  async updateVideo(id: number): Promise<any> {
    return { id };
  }
  async deleteVideo(id: number): Promise<any> {
    return { id };
  }
}

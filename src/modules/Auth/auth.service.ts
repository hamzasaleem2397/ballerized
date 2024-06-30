import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './schema/auth.schema';
import { JwtUserService } from '../jwt/services/jwt-user.service';
import { JWT } from '../jwt/types';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { Otp } from './schema/otp.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtUserService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Otp.name) private readonly otpModel: Model<Otp>,
  ) {}
  async register(createUserdto: CreateUserDto): Promise<User> {
    const { email, password } = createUserdto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExist = await this.userModel.findOne({ email: email });
    if (userExist) {
      throw new HttpException('User Already Exist', HttpStatus.CONFLICT);
    }
    const createdUser = new this.userModel({
      ...createUserdto,
      password: hashedPassword,
    });
    const user = await createdUser.save();
    await this.createOtp(user.email);

    return this.generateJWT(user) as any;
  }
  async login(loginUserdto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserdto;
    const user = await this.userModel
      .findOne({ email: email })
      .select('+password')
      .exec();

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const validPassword = await bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      throw new HttpException('Incorrect Password', HttpStatus.FORBIDDEN);
    }

    return this.generateJWT(user) as any;
  }
  generateJWT(user: User) {
    const payload: JWT = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };
    const accessToken = this.jwtService.generateAuthToken(payload);
    delete user.password;
    return {
      user: user,
      accessToken,
    };
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto, { user }: any): Promise<any> {
    console.log(user, 'asdadas');
    const getOtpData = (await this.otpModel.findOne({
      email: user.email,
    })) as any;
    console.log({ getOtpData });
    console.log(verifyOtpDto.otp);
    if (getOtpData?.otp != verifyOtpDto.otp) {
      throw new HttpException("Otp doesn't Match", HttpStatus.CONFLICT);
    }
    if (getOtpData.expiry < new Date()) {
      await this.otpModel.deleteOne({ _id: getOtpData._id }); // Delete expired OTP
      throw new HttpException('Otp Expired', HttpStatus.CONFLICT);
    }
    await this.otpModel.deleteOne({ _id: getOtpData._id });
    return { user, verifyOtpDto };
  }
  async createOtp(email: any) {
    const createOtp = new this.otpModel({
      expiry: new Date(Date.now() + 10 * 60 * 1000),
      otp: Math.floor(1000 + Math.random() * 9000),
      email: email,
    });
    await createOtp.save();
  }
}

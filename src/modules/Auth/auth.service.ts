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

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtUserService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
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

    return this.generateJWT(user) as any;
  }
  async login(loginUserdto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserdto;
    const user = await this.userModel
      .findOne({ email: email })
      .select('+password')
      .exec();
    console.log(user);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    console.log(user.password, password);
    const validPassword = await bcrypt.hashSync(password, user.password);
    if (!validPassword) {
      throw new HttpException('Incorrect Password', HttpStatus.FORBIDDEN);
    }

    return this.generateJWT(user) as any;
  }
  generateJWT(user: User) {
    const payload: JWT = {
      _id: user._id,
      email: user.email,
    };
    const accessToken = this.jwtService.generateAuthToken(payload);
    delete user.password;
    return {
      user: user,
      accessToken,
    };
  }
}

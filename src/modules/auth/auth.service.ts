import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { Injectable, Logger, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import CreateUserDto from './dto/create-user.dto';
import config from '../../config/keys';
import JwtPayload from './dto/jwt-payload.dto';
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private UserModel: Model<User>,
  ) {}
  // constructor(@InjectModel('Item') private ItemModel: Model<Item>) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.findOne(username);
    let comparison = false;
    await bcrypt.compare(pass, user.password).then((isMatched) => {
      if (isMatched) {
        comparison = isMatched;
      }
    });
    if (comparison) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userDoc: any) {
    const { _doc: user } = userDoc;
    const payload: JwtPayload = {
      username: user.userName,
      id: user._id,
      meta: user.name,
    };
    let access_token = this.jwtService.sign(payload);
    // Logger.log(this.jwtService.decode(access_token));
    return {
      access_token,
    };
  }
  async createUser(registrationForm: CreateUserDto) {
    // check if the username exists first
    const username_exists: boolean = (await this.UserModel.findOne({
      userName: registrationForm.userName,
    }))
      ? true
      : false;
    if (username_exists) {
      throw new HttpException(
        'UserName Exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    // encrypt password
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(registrationForm.password, salt);
    let user = {
      name: {
        lastName: registrationForm.lastName,
        firstName: registrationForm.firstName,
      },
      password: hash,
      userName: registrationForm.userName,
    };

    const newUser = new this.UserModel(user);
    return await newUser.save();
  }

  async findOne(username: string) {
    let user = await this.UserModel.findOne({ userName: username });
    if (user) {
      return user;
    } else {
      throw new HttpException('User Not found', HttpStatus.NOT_FOUND);
    }
  }
  async getUserFromToken(token: string) {
    if (
      this.jwtService.verify(token, {
        secret: config.secret,
      })
    ) {
      return this.jwtService.decode(token);
    }
  }
  async verify(userPayload: JwtPayload): Promise<Boolean> {
    let updated = await this.UserModel.findByIdAndUpdate(userPayload.id, {
      verified: true,
    });
    return !!updated;
  }
  async checkVerification(userPayload: JwtPayload)
  {
    return (await this.findOne(userPayload.username)).verified
  }
}

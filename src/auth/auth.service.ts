import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import CreateUserDto from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private UserModel: Model<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  // constructor(@InjectModel('Item') private ItemModel: Model<Item>) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  createUser(registrationForm: CreateUserDto) {
    return true;
  }
}

import {
  Controller,
  UseGuards,
  Post,
  Request,
  Logger,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import CreateUserDto from './dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
//   constructor(@InjectModel('Item') private ItemModel: Model<Item>) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() registrationForm: CreateUserDto) {
    return this.authService.createUser(registrationForm);
  }
}

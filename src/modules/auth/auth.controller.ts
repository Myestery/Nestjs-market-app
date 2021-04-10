import {
  Controller,
  UseGuards,
  Post,
  Request,
  Logger,
  Body,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import CreateUserDto from './dto/create-user.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('register')
  async register(
    @Body() registrationForm: CreateUserDto,
    @Request() req,
    @Res() res,
  ) {
    this.authService
      .createUser(registrationForm)
      .then(async (obj) => {
        return res.json((await this.authService.login(obj)));
      })
      .catch((err) => {
        return res.status(err.status).json({
          statusCode: err.status,
          message: err.message,
        });
      });
    // return this.authService.login(user);
  }
}

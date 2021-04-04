import {
  Controller,
  Get,
  Request,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { AuthService } from './auth/auth.service';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

import { AuthService } from './auth.service';
import { AuthGuard } from './../../common/guards/auth.guard';
import { VerifiedGuard } from './../../common/guards/verified.guard';
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
  Get,
  Req,
} from '@nestjs/common';
@Controller('users')
export class UsersController {
  constructor(private authService: AuthService) {}
  @Post('/verify')
  @UseGuards(AuthGuard)
  async verify(@Req() req, @Res() res) {
    return (
      this.authService.verify(req.user) &&
      res.json({
        statusCode: HttpStatus.CREATED,
        message: 'You have now been verified',
      })
    );
  }
  @UseGuards(VerifiedGuard)
  @Get('/verifiedContent')
  async GetVerifiedContent(@Res() res) {
    res.json({
      statusCode: HttpStatus.OK,
      message: 'This request passed a guard',
    });
  }
}

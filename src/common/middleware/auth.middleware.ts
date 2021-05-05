import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { AuthService } from './../../modules/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: any, res: any, next: () => void) {
    let auth = req.headers.authorization;
    let token =
      req.headers.authorization == undefined ? '' : auth.replace(/Bearer /, '');
    let user = token ? await this.authService.getUserFromToken(token) : false;
    if (!user) {
      next();
      return;
    }
    req.user = user;
    next();
  }
}

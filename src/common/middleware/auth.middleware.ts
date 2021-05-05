import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { AuthService } from './../../modules/auth/auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  use(req: any, res: any, next: () => void) {
    let auth = req.headers.authorization;
    let token =
      req.headers.authorization == undefined ? '' : auth.replace(/Bearer /, '');
    let user = this.authService.getUserFromToken(token);
    if (!user) {
      next();
      return;
    }
    req.user = user;
    Logger.log(user);
    // return validateRequest(request);
    // res.status(401).json({ error: 'unauthenticated' });
    next();
  }
}

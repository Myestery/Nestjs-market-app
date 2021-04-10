import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    Logger.log('in items module');
    // res.status(401).json({ error: 'unauthenticated' });
    next();
  }
}

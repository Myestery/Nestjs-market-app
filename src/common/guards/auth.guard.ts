import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.user) {
      Logger.log(request.user.username);
    }
    return true;
  }
}

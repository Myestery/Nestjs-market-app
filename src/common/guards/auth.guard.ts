import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { Observable } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';
import { AuthService } from './../../modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // const token = request.headers.authorization.replace(/Bearer /, '');
    // Logger.log(token);
    // return validateRequest(request);
    // const user = this.authService.getUserFromToken(token);
    // Logger.log(user)
    return true;
  }
}

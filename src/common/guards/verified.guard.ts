import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './../../modules/auth/auth.service';

@Injectable()
export class VerifiedGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean>
  {
    const req = context.switchToHttp().getRequest();
    const isVerified = this.authService.checkVerification(req.user);
    return isVerified;
  }
}

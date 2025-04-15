import {
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { RequestWithCookies } from '@app/common';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserDocument } from '@app/common';

interface RequestWithUser extends RequestWithCookies {
  user: UserDocument;
}

export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithCookies>();
    const jwt = request.cookies?.accessToken;

    if (!jwt) {
      throw new UnauthorizedException();
    }

    return this.authClient
      .send('authenticate', {
        accessToken: jwt,
      })
      .pipe(
        tap((res: UserDocument) => {
          const request = context.switchToHttp().getRequest<RequestWithUser>();
          request.user = res;
        }),
        map(() => true),
        catchError(() => of(false)),
      );
  }
}

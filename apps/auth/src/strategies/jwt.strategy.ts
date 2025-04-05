import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { TokenPayload } from '../interfaces';
import { RequestWithCookies } from '../interfaces';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: RequestWithCookies): string | null => {
          const token = (request?.cookies?.accessToken ||
            (request?.accessToken as any)) as string;

          return token || null;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET') || 'default-secret',
    });
  }

  async validate({ userId }: TokenPayload) {
    return await this.usersService.getUser({ _id: userId });
  }
}

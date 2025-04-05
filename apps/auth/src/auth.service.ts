import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserDocument } from './users/models/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: UserDocument, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + Number(this.configService.get('JWT_EXPIRATION')),
    );

    const token = await this.jwtService.signAsync(tokenPayload);
    console.log('token', token);

    response.cookie('accessToken', token, {
      httpOnly: true,
      expires,
    });

    return token;
  }
}

import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CurrentUser } from './decorator/current-user.decorator';
import { UserDocument } from './users/models/user.schema';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('user', user);
    const jwt = await this.authService.login(user, response);
    response.send(jwt);
  }
}

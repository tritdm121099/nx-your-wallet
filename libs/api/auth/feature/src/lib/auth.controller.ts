import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthService } from '@yw/api/auth/data-access';
import { Publish } from '@yw/api/shared';
import { Response } from 'express';
import { GoogleOAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Publish()
  @Post('sign-up')
  signUp(@Body() userData: any) {
    // Logic for signing up a user
    return { message: 'User signed up successfully', userData };
  }

  @Publish()
  @Post('sign-in')
  signIn(@Body() credentials: any) {
    // Logic for signing in a user
    return { message: 'User signed in successfully', credentials };
  }

  // @Post('auth/logout')
  // async logout(@Request() req) {
  //   return req.logout();
  // }

  @Get('')
  refreshToken() {
    return true;
  }

  @Publish()
  @UseGuards(GoogleOAuthGuard)
  @Get('google')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @Publish()
  @UseGuards(GoogleOAuthGuard)
  @Get('google-auth-redirect')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    const { encodedUser } = await this.authService.signInWithGoogle(
      req.user,
      res
    );
    return res.redirect(
      `${process.env['GOOGLE_REDIRECT_URL_CLIENT_ANGULAR']}?jwtUser=${encodedUser}`
    );
  }
}

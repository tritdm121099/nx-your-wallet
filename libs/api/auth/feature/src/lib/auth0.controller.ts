import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOAuthGuard } from './guards';
import { AuthService } from '@yw/api/auth/data-access';
import { Response } from 'express';

@Controller('auth0')
export class Auth0Controller {
  constructor(private authService: AuthService) {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @UseGuards(GoogleOAuthGuard)
  @Get('google-auth-redirect')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    const { encodedUser } = await this.authService.signInWithGoogle(
      req.user,
      res
    );
    return res.redirect(
      `${process.env['GOOGLE_REDIRECT_URL_CLIENT_REACT']}?jwtUser=${encodedUser}`
    );
  }
}

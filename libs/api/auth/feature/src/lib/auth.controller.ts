import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  AuthService,
  SignInDto,
  SignUpDto,
  cookieAccessTokenName,
  cookieRefreshTokenName,
} from '@yw/api/auth/data-access';
import { AuthConfig, authConfiguration, Publish } from '@yw/api/shared';
import { Request, Response } from 'express';
import { GoogleOAuthGuard, JwtRefreshGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    @Inject(authConfiguration.KEY)
    private authConfig: AuthConfig
  ) {}

  @Publish()
  @Post('sign-up')
  signUp(@Body() data: SignUpDto, @Res() res: Response) {
    return this.authService.signUp(res, data);
  }

  @Publish()
  @Post('sign-in')
  async signIn(@Body() data: SignInDto, @Res() res: Response) {
    return this.authService.defaultSignIn(res, data);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie(cookieAccessTokenName);
    res.clearCookie(cookieRefreshTokenName);
    // req.logout(
    //   {
    //     keepSessionInfo: false,
    //   },
    //   (err) => {
    //     return err;
    //   }
    // );

    return res.status(200).json({ message: 'Logged out successfully' });
  }

  @Publish()
  @UseGuards(JwtRefreshGuard)
  @Get('refresh-token')
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
      `${this.authConfig.google.redirectClientUrl}?jwtUser=${encodedUser}`
    );
  }
}

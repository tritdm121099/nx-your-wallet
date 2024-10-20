import { Controller, Post, Body, Get, Req, Res, UseGuards } from "@nestjs/common";
import { GoogleOAuthGuard } from "./guards";
import { Response } from 'express';
import { AuthService } from '@yw/api/auth/data-access';

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post("sign-up")
  signUp(@Body() userData: any) {
    // Logic for signing up a user
    return { message: "User signed up successfully", userData };
  }

  @Post("sign-in")
  signIn(@Body() credentials: any) {
    // Logic for signing in a user
    return { message: "User signed in successfully", credentials };
  }

  @Get("")
  refreshToken() {
    return true;
  }

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
      `${process.env['GOOGLE_REDIRECT_URL_CLIENT_ANGULAR']}?jwtUser=${encodedUser}`
    );
  }
}

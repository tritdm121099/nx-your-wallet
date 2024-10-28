import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/pg-prisma-clients';
import { UserFromJwt } from '../../interfaces';
import { JwtService } from '@nestjs/jwt';
import { AuthConfig, authConfiguration } from '@yw/api/shared';
import { CookieOptions, Response } from 'express';
import { cookieAccessTokenName, cookieRefreshTokenName } from '../../constants';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    @Inject(authConfiguration.KEY) private authConfig: AuthConfig
  ) {}

  async setTokensToCookies(res: Response, user: User) {
    const { accessToken, refreshToken } = await this.getTokens(user);
    this.setAccessTokenToCookies(res, accessToken);
    this.setRefreshTokenToCookies(res, refreshToken);
  }

  setAccessTokenToCookies(res: Response, token: string) {
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      maxAge: this.authConfig.jwt.expiresTime,
    };

    res.cookie(
      cookieAccessTokenName,
      token,
      cookieOptions
    );
  }

  setRefreshTokenToCookies(res: Response, token: string) {
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      maxAge: this.authConfig.jwt.refreshExpiresTime,
      // sameSite: 'strict',
      // secure: true, set when https
    };

    res.cookie(
      cookieRefreshTokenName,
      token,
      cookieOptions
    );
  }

  async getTokens(user: User) {
    const userFromToken: UserFromJwt = {
      id: user.id,
      sub: {
        email: user.email,
      },
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(userFromToken, {
        secret: this.authConfig.jwt.secretKey,
        expiresIn: this.authConfig.jwt.expiresTimeString,
      }),
      this.jwtService.signAsync(userFromToken, {
        secret: this.authConfig.jwt.refreshSecretKey,
        expiresIn: this.authConfig.jwt.refreshExpiresTimeString,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}

import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/pg-prisma-clients';
import { UserService } from '@yw/api/user/data-access';
import { CookieOptions, Response } from 'express';
import { GoogleUser } from './interfaces';
import { AuthConfig, authConfiguration } from '@yw/api/shared';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(authConfiguration.KEY)
    private authConfig: AuthConfig
  ) {}

  async signInWithGoogle(
    user: GoogleUser,
    res: Response
  ): Promise<{
    encodedUser: string;
  }> {
    if (!user) throw new BadRequestException('Unauthenticated');

    const existingUser = await this.userService.getUser({
      where: { email: user.email },
    });

    if (!existingUser) return this.registerGoogleUser(res, user);

    const encodedUser = this.encodeUserDataAsJwt(existingUser);

    this.setJwtTokenToCookies(res, existingUser);

    return {
      encodedUser,
    };
  }

  private async registerGoogleUser(res: Response, user: GoogleUser) {
    try {
      const fullName =
        !user.firstName && !user.lastName
          ? user.email
          : `${user.lastName} ${user.firstName}`.trim();

      const newUser = await this.userService.createUser({
        data: {
          email: user.email,
          name: fullName,
          picture: user.picture,
        },
      });

      const encodedUser = this.encodeUserDataAsJwt(newUser);

      this.setJwtTokenToCookies(res, newUser);

      return {
        encodedUser,
      };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  private encodeUserDataAsJwt(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = user;

    return this.jwtService.sign(userData);
  }

  setJwtTokenToCookies(res: Response, user: User) {
    const expirationDateInMilliseconds =
      new Date().getTime() + this.authConfig.jwt.expiresTime;
    const cookieOptions: CookieOptions = {
      httpOnly: true, // this ensures that the cookie cannot be accessed through JavaScript!
      expires: new Date(expirationDateInMilliseconds),
    };

    res.cookie('jwt', this.generateJwtToken(user), cookieOptions);
  }

  generateJwtToken(user: User) {
    return this.jwtService.sign({
      id: user.id,
      sub: {
        email: user.email,
      },
    });
  }
}

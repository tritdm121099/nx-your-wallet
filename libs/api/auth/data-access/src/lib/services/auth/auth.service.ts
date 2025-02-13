import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/pg-prisma-clients';
import { AuthConfig, authConfiguration } from '@yw/api/shared';
import { UserService } from '@yw/api/user/data-access';
import { LoginErrorCodes, RegisterErrorCodes, SignInDto, SignUpDto } from '@yw/fe-be-interfaces';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { GoogleUser, UserFromJwt } from '../../interfaces';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(authConfiguration.KEY)
    private authConfig: AuthConfig,
    private tokenService: TokenService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getUser({ where: { email } });
    if (!user) {
      throw new BadRequestException(LoginErrorCodes.AuthFailed);
    }
    if (user.password) {
      const isMatch: boolean = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        throw new BadRequestException(LoginErrorCodes.AuthFailed);
      }
    } else {
      throw new BadRequestException(LoginErrorCodes.TryOtherMethod);
    }
    return user;
  }

  async signUp(res: Response, params: SignUpDto) {
    if (params.password !== params.confirm) {
      throw new BadRequestException(RegisterErrorCodes.ConfirmPassFail);
    }

    const existingUser = await this.userService.getUser({
      where: {
        email: params.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException(RegisterErrorCodes.EmailHaveUsed);
    }

    const hashedPassword = await bcrypt.hash(
      params.password,
      Number(this.authConfig.passwordSalt)
    );
    const newUser = await this.userService.createUser({
      data: {
        email: params.email,
        name: params.name,
        password: hashedPassword,
      },
    });

    await this.tokenService.setTokensToCookies(res, newUser);

    return res.json({
      message: 'Sign up success',
    });
  }

  async defaultSignIn(res: Response, params: SignInDto) {
    const user = await this.validateUser(params.email, params.password);
    await this.tokenService.setTokensToCookies(res, user);

    return res.json({
      message: 'Sign in success',
    });
  }

  async signInWithGoogle(
    user: GoogleUser,
    res: Response
  ): Promise<{
    encodedUser: string;
  }> {
    if (!user) throw new BadRequestException(LoginErrorCodes.AuthFailed);

    const existingUser = await this.userService.getUser({
      where: { email: user.email },
    });

    if (!existingUser) return this.registerGoogleUser(res, user);

    const encodedUser = this.encodeUserDataAsJwt(existingUser);

    await this.tokenService.setTokensToCookies(res, existingUser);

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

      await this.tokenService.setTokensToCookies(res, newUser);

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

  async refreshToken(userJwt: UserFromJwt, res: Response) {
    const user = await this.userService.getUser({ where: { id: userJwt.id } });

    if (user) {
      await this.tokenService.setTokensToCookies(res, user);

      return res.status(200).json({
        message: 'Refresh tokens success',
      });
    } else {
      throw new UnauthorizedException();
    }
  }
}

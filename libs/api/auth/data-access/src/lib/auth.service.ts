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
import * as bcrypt from 'bcrypt';
import { SignInDto, SignUpDto } from './dtos';
import { AuthConfig, authConfiguration } from '@yw/api/shared';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(authConfiguration.KEY)
    private authConfig: AuthConfig
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getUser({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.password) {
      const isMatch: boolean = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        throw new BadRequestException('Password does not match');
      }
    } else {
      throw new BadRequestException('Have used other method to register!');
    }
    return user;
  }

  async signUp(res: Response, params: SignUpDto) {
    if (params.password !== params.confirm) {
      throw new BadRequestException('Confirm password not match');
    }

    const existingUser = await this.userService.getUser({
      where: {
        email: params.email,
      },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
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

    this.setJwtTokenToCookies(res, newUser);

    return res.json({
      message: 'Sign up success',
    });
  }

  async defaultSignIn(res: Response, params: SignInDto) {
    const user = await this.validateUser(params.email, params.password);
    this.setJwtTokenToCookies(res, user);
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

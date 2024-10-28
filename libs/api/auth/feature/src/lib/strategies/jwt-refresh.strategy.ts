import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserFromJwt } from '@yw/api/auth/data-access';
import { AuthConfig, authConfiguration } from '@yw/api/shared';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenStrategy } from '../interfaces';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(@Inject(authConfiguration.KEY) private authConfig: AuthConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.['refreshToken'] || null,
      ]),
      secretOrKey: authConfig.jwt.refreshSecretKey,
      passReqToCallback: true,
    });
  }

  async validate(payload: UserFromJwt & TokenStrategy) {
    return payload;
  }
}

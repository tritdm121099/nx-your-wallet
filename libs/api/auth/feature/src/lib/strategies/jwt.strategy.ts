import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from '@yw/api/auth/data-access';
import { TokenStrategy } from '../interfaces';
import { Inject } from '@nestjs/common';
import { authConfiguration, AuthConfig } from '@yw/api/shared';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(authConfiguration.KEY) private authConfig: AuthConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.['jwt'] || null,
      ]),
      secretOrKey: authConfig.jwt.secretKey,
    });
  }

  async validate(payload: UserFromJwt & TokenStrategy) {
    return payload;
  }
}

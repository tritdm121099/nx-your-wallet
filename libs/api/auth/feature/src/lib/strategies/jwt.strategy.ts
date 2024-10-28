import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from '@yw/api/auth/data-access';
import { TokenStrategy } from '../interfaces';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.['jwt'] || null,
      ]),
      secretOrKey: process.env['JWT_SECRET'],
    });
  }

  async validate(payload: UserFromJwt & TokenStrategy) {
    return payload;
  }
}

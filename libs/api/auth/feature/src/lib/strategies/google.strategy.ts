import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { EStrategies, GoogleUser } from '@yw/api/auth/data-access';
import { AuthConfig, authConfiguration } from '@yw/api/shared';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  EStrategies.GOOGLE
) {
  constructor(
    @Inject(authConfiguration.KEY)
    private authConfig: AuthConfig
  ) {
    super({
      clientID: authConfig.google.clientId,
      clientSecret: authConfig.google.clientSecret,
      callbackURL: authConfig.google.redirectUrl,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: {
      name: { givenName: string; familyName: string };
      emails: { value: string }[];
      photos: { value: string }[];
    },
    done: VerifyCallback
  ) {
    try {
      const { name, emails, photos } = profile;
      const user: GoogleUser = {
        email: emails[0].value,
        firstName: name.givenName,
        lastName: name.familyName,
        picture: photos[0].value,
        accessToken,
        refreshToken,
      };
      done(null, user);
    } catch (error) {
      Logger.error(error);
      const internalError = new InternalServerErrorException();
      done(internalError);
      throw internalError;
    }
  }
}

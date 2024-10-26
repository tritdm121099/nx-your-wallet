import { ConfigType, registerAs } from '@nestjs/config';

export const authConfiguration = registerAs('auth', () => ({
  jwt: {
    expiresTime:
      Number(process.env['JWT_EXPIRES_MILLISECONDS']) ||
      7 * 24 * 60 * 60 * 1000,
    get expiresTimeString() {
      return this.expiresTime.toString() + 's';
    },
    secretKey: process.env['JWT_SECRET'] || '123123'
  },
  google: {
    clientId: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    redirectUrl: process.env['GOOGLE_REDIRECT_URL'],
    redirectClientUrl: process.env['GOOGLE_REDIRECT_URL_CLIENT_ANGULAR'],
  },
  passwordSalt: process.env['PASSWORD_SALT'] || 'password_salt',
}));

export type AuthConfig = Readonly<ConfigType<typeof authConfiguration>>;

import { ConfigType, registerAs } from '@nestjs/config';

export const authConfiguration = registerAs('auth', () => ({
  jwt: {
    expiresTime: 15 * 60 * 1000,
    get expiresTimeString() {
      return this.expiresTime.toString() + 's';
    },
    refreshExpiresTime: 7 * 24 * 60 * 60 * 1000,
    get refreshExpiresTimeString() {
      return this.refreshExpiresTime.toString() + 's';
    },
    secretKey: process.env['JWT_SECRET'] || 'jwt_secret',
    refreshSecretKey: process.env['JWT_REFRESH_SECRET'] || 'jwt_refresh_secret'
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

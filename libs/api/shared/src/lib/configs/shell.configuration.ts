import { ConfigType, registerAs } from '@nestjs/config';

export const shellConfiguration = registerAs('shell', () => ({
  isProd: process.env['NODE_ENV'] === 'production',
}));

export type ShellConfig = Readonly<ConfigType<typeof shellConfiguration>>;

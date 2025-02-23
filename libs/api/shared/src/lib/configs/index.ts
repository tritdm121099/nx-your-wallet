import { shellConfiguration, mailConfiguration, authConfiguration } from '.';

export * from './auth.configuration';
export * from './shell.configuration';
export * from './mail.configuration';

export const beConfigurations = [
  shellConfiguration,
  authConfiguration,
  mailConfiguration,
];

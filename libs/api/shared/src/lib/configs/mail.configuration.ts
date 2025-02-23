import { ConfigType, registerAs } from '@nestjs/config';

export const mailConfiguration = registerAs('mail', () => ({
  emailjs: {
    user: process.env['EMAILJS_USER'],
    password: process.env['EMAILJS_PASSWORD'],
    host: process.env['EMAILJS_USER_HOST'],
    templateIds: {
      resetPassword: process.env['EMAILJS_RESET_PASSWORD_TEMPLATE_ID'],
    }
  }
}));

export type MailConfig = Readonly<ConfigType<typeof mailConfiguration>>;

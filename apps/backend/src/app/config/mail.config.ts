import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as path from 'node:path';

export const getMailConfig = (): MailerAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    transport: {
      host: config.get('MAIL_SMTP_HOST'),
      port: +config.get('MAIL_SMTP_PORT'),
      secure: false,
      auth: {
        user: config.get('MAIL_USER_NAME'),
        pass: config.get('MAIL_USER_PASSWORD'),
      },
    },
    defaults: {
      from: `"No Reply" <${config.get('MAIL_FROM')}>`,
    },
    template: {
      dir: path.resolve(__dirname, 'assets/template'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  }),
});

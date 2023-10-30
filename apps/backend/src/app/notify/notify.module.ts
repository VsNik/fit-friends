import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { NotifyService } from './notify.service';
import { NotifyController } from './notify.controller';
import { NOTIFY_REPO } from './entities/notify-repository.interface';
import { NotifyRepository } from './notify.repository';
import { Notify } from './models/notify.model';
import { getMailConfig } from '../config/mail.config';
import { TrainingCreatedListener } from './listeners/training-created.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Notify]), MailerModule.forRootAsync(getMailConfig())],
  providers: [
    NotifyService,
    TrainingCreatedListener,
    {
      provide: NOTIFY_REPO,
      useClass: NotifyRepository,
    },
  ],
  controllers: [NotifyController],
  exports: [NotifyService],
})
export class NotifyModule {}

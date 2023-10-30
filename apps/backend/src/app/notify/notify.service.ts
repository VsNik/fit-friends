import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { INotifyRepository, NOTIFY_REPO } from './entities/notify-repository.interface';
import { NotifyEntity } from './entities/notify.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { TrainingCreatedEvent } from '../trainings/events/training-created.event';

const NOTIFY_EMPTY_ERROR = 'Notification list is empty.';
export enum MailNotify {
  Subject = 'Новые тренировки на FitFriends',
  Template = './notify',
}

@Injectable()
export class NotifyService {
  constructor(
    @Inject(NOTIFY_REPO)
    private readonly notifyRepository: INotifyRepository,
    private readonly mailerService: MailerService,
  ) {}

  async create(event: TrainingCreatedEvent) {
    const notifyEntity = NotifyEntity.create(event);
    await this.notifyRepository.save(notifyEntity);
  }

  async send(coachId: string): Promise<void> {
    const notifys = await this.notifyRepository.findByCoachId(coachId);

    if (!notifys) {
      throw new BadRequestException(NOTIFY_EMPTY_ERROR);
    }

    for (const notify of notifys) {
      await this.mailerService.sendMail({
        to: notify.subscribeEmails,
        subject: MailNotify.Subject,
        template: MailNotify.Template,
        context: {
          coach: notify.coachName,
          title: notify.trainingTitle,
          image: notify.trainingImage,
        },
      });

      await this.notifyRepository.delete(notify.id);
    }
  }
}

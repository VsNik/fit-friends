import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { INotifyRepository, NOTIFY_REPO } from './entities/notify-repository.interface';
import { IUser } from '../users/user.interface';
import { ITraining } from '../trainings/training.interface';
import { NotifyEntity } from './entities/notify.entity';
import { UsersService } from '../users/users.service';
import { MailerService } from '@nestjs-modules/mailer';

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
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
  ) {}

  async create(coach: IUser, training: ITraining): Promise<void> {
    const subscribeEmails = coach.subscribers.map((user) => user.email);
    if (!subscribeEmails.length) {
      return;
    }

    const notifyEntity = NotifyEntity.create({
      coachId: coach.id,
      subscribeEmails,
      training,
    });

    await this.notifyRepository.save(notifyEntity);
  }

  async send(coachId: string): Promise<void> {
    const coach = await this.usersService.getUser(coachId);
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
          coach: coach.name,
          title: notify.training.title,
          image: notify.training.bgImage,
        }
      });

      await this.notifyRepository.delete(notify.id);
    }
  }
}

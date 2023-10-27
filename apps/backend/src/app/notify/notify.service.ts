import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { INotifyRepository, NOTIFY_REPO } from './entities/notify-repository.interface';
import { IUser } from '../users/user.interface';
import { ITraining } from '../trainings/training.interface';
import { NotifyEntity } from './entities/notify.entity';
import { UsersService } from '../users/users.service';

const NOTIFY_EMPTY_ERROR = 'Notification list is empty.';

@Injectable()
export class NotifyService {
  constructor(
    @Inject(NOTIFY_REPO)
    private readonly notifyRepository: INotifyRepository,
    private readonly usersService: UsersService,
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

  async send(coachId: string) {
    const coach = await this.usersService.getUser(coachId);
    const notifys = await this.notifyRepository.findByCoachId(coachId);

    if (!notifys) {
      throw new BadRequestException(NOTIFY_EMPTY_ERROR);
    }

    for (const notify of notifys) {
      console.log({
        to: notify.subscribeEmails,
        coach: coach.name,
        title: notify.training.title,
        image: notify.training.bgImage,
      });
    }
  }
}

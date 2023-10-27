import { randomUUID } from 'crypto';
import { INotify } from '../notify.interface';
import { ITraining } from '../../trainings/training.interface';

export class NotifyEntity implements INotify {
  id: string = randomUUID();
  coachId: string;
  subscribeEmails: string[];
  training: ITraining;
  createdAt: string = new Date().toISOString();

  public static create(item: INotify): NotifyEntity {
    const notify = new NotifyEntity();
    Object.assign(notify, item);
    return notify;
  }
}

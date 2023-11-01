import { INotify } from '@fit-friends/libs/types';
import { randomUUID } from 'crypto';

export class NotifyEntity implements INotify {
  id: string = randomUUID();
  coachId: string;
  coachName: string;
  subscribeEmails: string[];
  trainingTitle: string;
  trainingImage: string;
  createdAt: string = new Date().toISOString();

  public static create(item: INotify): NotifyEntity {
    const notify = new NotifyEntity();
    Object.assign(notify, item);
    return notify;
  }
}

import { NotifyEntity } from './notify.entity';

export const NOTIFY_REPO = Symbol('NOTIFY_REPO');

export interface INotifyRepository {
  save(entity: NotifyEntity): Promise<NotifyEntity>;
  findByCoachId(coachId: string): Promise<NotifyEntity[]>;
  delete(id: string): Promise<void>;
}

import { TrainingOrderFilter, TrainingFilter } from '@fit-friends/filters';
import { TrainingEntity } from './training.entity';
import { TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/shared';

export const TRAININGS_REPO = Symbol('TRAININGS_REPO');

export interface ITrainingsRepository {
  get(id: string): Promise<TrainingEntity>;
  save(entity: TrainingEntity): Promise<TrainingEntity>;
  findById(id: string): Promise<TrainingEntity | null>;
  update(entity: TrainingEntity): Promise<TrainingEntity>;
  getManyByCoachId(filters: TrainingFilter, coachId?: string): Promise<[TrainingEntity[], number]>;
  getManyByCoachIdFromOrders(coachId: string, filter: TrainingOrderFilter): Promise<[TrainingEntity[], number]>;
  getPopular(): Promise<[TrainingEntity[], number]>;
  getSpecial(): Promise<[TrainingEntity[], number]>;
  getForUser(types: TrainingType[], level: TrainingLevel, duration: TrainingDuration): Promise<TrainingEntity[]>;
}

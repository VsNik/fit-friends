import { TrainingOrderFilter, TrainingFilter } from '@fit-friends/libs/types';
import { TrainingEntity } from './training.entity';

export interface ITrainingsRepository {
  get(id: string): Promise<TrainingEntity>;
  save(entity: TrainingEntity): Promise<TrainingEntity>;
  findById(id: string): Promise<TrainingEntity | null>;
  update(entity: TrainingEntity): Promise<TrainingEntity>;
  getManyByCoachId(id: string, filters: TrainingFilter): Promise<[TrainingEntity[], number]>;
  getManyByCoachIdFromOrders(coachId: string, filter: TrainingOrderFilter): Promise<[TrainingEntity[], number]>;
}

export const TRAININGS_REPO = Symbol('TRAININGS_REPO');

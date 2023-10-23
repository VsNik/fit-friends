import { TrainingsFilter } from '@fit-friends/libs/types';
import { TrainingEntity } from './training.entity';

export interface ITrainingsRepository {
  get(id: string): Promise<TrainingEntity>;
  create(entity: TrainingEntity): Promise<TrainingEntity>;
  findById(id: string): Promise<TrainingEntity | null>;
  update(entity: TrainingEntity): Promise<TrainingEntity>;
  all(id: string, filters: TrainingsFilter): Promise<[TrainingEntity[], number]>;
}

export const TRAININGS_REPO = Symbol('TRAININGS_REPO');

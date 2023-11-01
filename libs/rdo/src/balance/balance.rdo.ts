import { ITraining } from '@fit-friends/libs/types';
import { Expose } from 'class-transformer';

export class BalanceRdo {
  @Expose()
  id: string;

  @Expose()
  training: ITraining;

  @Expose()
  count: number;

  @Expose()
  createdAt: string;
}

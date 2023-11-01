import { Expose } from 'class-transformer';

export class CoachProfileRdo {
  @Expose()
  certificate?: string;

  @Expose()
  merits?: string;

  @Expose()
  personalTraining?: boolean;
}

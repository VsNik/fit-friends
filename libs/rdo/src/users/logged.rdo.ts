import { Expose } from 'class-transformer';

export class LoggedRdo {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken?: string;
}

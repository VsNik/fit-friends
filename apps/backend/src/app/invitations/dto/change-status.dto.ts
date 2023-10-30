import { InviteStatus } from '@fit-friends/libs/types';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class ChangeStatusDto {
  @IsEnum(InviteStatus)
  @IsNotEmpty()
  readonly status: InviteStatus;
}

import { InviteStatus } from '@fit-friends/libs/types';
import { INVITE_STATUS_NOT_EMPTY, INVITE_STATUS_VALUE } from '@fit-friends/libs/validation';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class ChangeStatusDto {
  @IsEnum(InviteStatus, { message: INVITE_STATUS_VALUE })
  @IsNotEmpty({ message: INVITE_STATUS_NOT_EMPTY })
  readonly status: InviteStatus;
}

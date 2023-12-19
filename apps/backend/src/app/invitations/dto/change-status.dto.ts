import { InviteStatus } from '@fit-friends/shared';
import { INVITE_STATUS_VALUE, OtherError } from '@fit-friends/libs/validation';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class ChangeStatusDto {
  @ApiProperty({
    description: 'Статус заявки',
    example: InviteStatus.Accepted,
  })
  @IsEnum(InviteStatus, { message: INVITE_STATUS_VALUE })
  @IsNotEmpty({ message: OtherError.InviteStatusRequired })
  readonly status: InviteStatus;
}

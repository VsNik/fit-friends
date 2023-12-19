import { InviteStatus } from '@fit-friends/shared';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';

export class InvitationRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор заявки',
    example: 'ea2038cf-0956-4897-8af5-b8a5bbe1861f',
  })
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Уникальный идентификатор инициатора заявки',
    example: 'ea2038cf-0956-4897-8af5-b8a5bbe1861f',
  })
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  initiatorId: string;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: 'ea2038cf-0956-4897-8af5-b8a5bbe1861f',
  })
  @IsUUID()
  @IsNotEmpty()
  @Expose()
  toUserId: string;

  @ApiProperty({
    description: 'Статус заявки',
    example: InviteStatus.Waiting,
  })
  @IsEnum(InviteStatus)
  @IsNotEmpty()
  @Expose()
  status: InviteStatus;
}

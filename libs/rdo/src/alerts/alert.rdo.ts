import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AlertRdo {

  @ApiProperty({
    description: 'Уникальный идентификатор оповещения',
    example: 'ea2038cf-0956-4897-8af5-b8a5bbe1861f',
  })
  @Expose()
  id: string;

  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: 'ea2038cf-0956-4897-8af5-b8a5bbe1861f',
  })
  @Expose()
  userId: string;

  @ApiProperty({
    description: 'Текст оповещения',
    example: 'Пользователь Ivan добавил Вас в друзья',
  })
  @Expose()
  text: string;
  createdAt: string;
}

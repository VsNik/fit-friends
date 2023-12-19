import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaginationRdo {
  @ApiProperty({ description: 'Текущая страница', example: 1 })
  @Expose()
  page: number;

  @ApiProperty({ description: 'Общее количество записей', example: 50 })
  @Expose()
  total: number;
}

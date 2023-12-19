import { ApiProperty } from '@nestjs/swagger';
import { AlertRdo } from './alert.rdo';
import { Expose } from 'class-transformer';
import { PaginationRdo } from '../pagination.rdo';

export class AlertCollectionRdo extends PaginationRdo {
  @ApiProperty({
    type: [AlertRdo],
  })
  @Expose()
  data: AlertRdo[];
}

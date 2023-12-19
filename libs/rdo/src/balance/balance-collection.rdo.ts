import { ApiProperty } from '@nestjs/swagger';
import { BalanceRdo } from './balance.rdo';
import { Expose } from 'class-transformer';
import { PaginationRdo } from '../pagination.rdo';

export class BalanceCollectionRdo extends PaginationRdo {
  @ApiProperty({ type: [BalanceRdo] })
  @Expose()
  data: BalanceRdo[];
}

import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserRdo } from './user.rdo';
import { PaginationRdo } from '../pagination.rdo';

export class UserCollectionRdo extends PaginationRdo {
  @ApiProperty({ type: [UserRdo] })
  @Expose()
  data: UserRdo[];
}

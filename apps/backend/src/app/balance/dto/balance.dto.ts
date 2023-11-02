import { BALANCE_COUNT_IS_NUMBER, BALANCE_COUNT_NOT_EMPTY } from '@fit-friends/libs/validation';
import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class BalanceDto {
  @IsInt({ message: BALANCE_COUNT_IS_NUMBER })
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: BALANCE_COUNT_IS_NUMBER })
  @IsPositive({ message: BALANCE_COUNT_IS_NUMBER })
  @IsNotEmpty({ message: BALANCE_COUNT_NOT_EMPTY })
  count: number;
}

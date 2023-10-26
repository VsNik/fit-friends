import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class BalanceDto {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  @IsNotEmpty()
  count: number;
}

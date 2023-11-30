import { BalanceError } from '@fit-friends/libs/validation';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class BalanceDto {

  @ApiProperty({
    description: 'Количество тренировок для списания / пополнения',
    example: 5,
  })
  @IsInt({ message: BalanceError.Number })
  @IsNumber({ allowInfinity: false, allowNaN: false }, { message: BalanceError.Number })
  @IsPositive({ message: BalanceError.Number })
  @IsNotEmpty({ message: BalanceError.Required })
  count: number;
}

import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateDto } from './create.dto';
import { Type } from 'class-transformer';

export class CreateCoachDto extends CreateDto {
  @IsString()
  @IsNotEmpty()
  readonly certificate: string;

  @IsString()
  @IsNotEmpty()
  readonly merits: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  readonly personalTraining: boolean;
}

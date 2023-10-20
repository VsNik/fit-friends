import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateDto } from './create.dto';

export class CreateCoachDto extends CreateDto {
  @IsString()
  @IsNotEmpty()
  readonly certificate: string;

  @IsString()
  @IsNotEmpty()
  readonly merits: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly personalTraining: boolean;
}

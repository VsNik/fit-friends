import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateDto } from './create.dto';

export class CreateCoachDto extends CreateDto {
  @IsString()
  @IsNotEmpty()
  certificate: string;

  @IsString()
  @IsNotEmpty()
  merits: string;

  @IsBoolean()
  @IsNotEmpty()
  personalTraining: boolean;
}

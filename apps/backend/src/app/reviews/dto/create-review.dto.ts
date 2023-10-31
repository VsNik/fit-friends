import { IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  readonly rating: number;

  @IsString()
  // @Length(100, 1024)
  @IsNotEmpty()
  readonly text: string;
}

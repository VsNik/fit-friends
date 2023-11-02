import { RATING_IS_NUMBER, REVIEW_IS_STRING, REVIEW_NOT_EMPTY, ReviewValidate } from '@fit-friends/libs/validation';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @Type(() => Number)
  @IsNumber({}, { message: RATING_IS_NUMBER })
  @Min(ReviewValidate.RatingMin, { message: RATING_IS_NUMBER })
  @Max(ReviewValidate.RatingMax, { message: RATING_IS_NUMBER })
  readonly rating: number;

  @IsString({ message: REVIEW_IS_STRING })
  @Length(ReviewValidate.TextMinLength, ReviewValidate.TextMaxLength, { message: REVIEW_IS_STRING })
  @IsNotEmpty({ message: REVIEW_NOT_EMPTY })
  readonly text: string;
}

import { ReviewValidate, OtherError, RATING_IS_NUMBER, REVIEW_IS_STRING } from '@fit-friends/libs/validation';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Оценка тренировки',
    example: 5,
  })
  @IsInt()
  @Type(() => Number)
  @IsNumber({}, { message: RATING_IS_NUMBER })
  @Min(ReviewValidate.RatingMin, { message: RATING_IS_NUMBER })
  @Max(ReviewValidate.RatingMax, { message: RATING_IS_NUMBER })
  readonly rating: number;

  @ApiProperty({
    description: 'Текст отзыва',
    example: 'Хорошая тренировка',
  })
  @IsString({ message: REVIEW_IS_STRING })
  @Length(ReviewValidate.TextMinLength, ReviewValidate.TextMaxLength, { message: REVIEW_IS_STRING })
  @IsNotEmpty({ message: OtherError.ReviewRequired })
  readonly text: string;
}

import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import {
  Location,
  SortDirection,
  StatisticSorting,
  TrainingDuration,
  TrainingLevel,
  TrainingSortDirection,
  TrainingSorting,
  TrainingType,
  UserSorting,
} from '@fit-friends/shared';
import { DEFAULT_PAGE, MAX_LIMIT } from '@fit-friends/libs/validation';

export class Pagination {
  @Type(() => Number)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  limit = MAX_LIMIT;

  @Type(() => Number)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  page = DEFAULT_PAGE;

  @IsEnum(SortDirection)
  direction: SortDirection = SortDirection.Desc;
}

export class UsersFilter extends Pagination {
  @IsEnum(UserSorting)
  sorting: UserSorting = UserSorting.Created;

  @IsEnum(Location, { each: true })
  @IsOptional()
  location: Location;

  @IsEnum(TrainingType, { each: true })
  @IsOptional()
  type: TrainingType[];

  @IsEnum(TrainingLevel)
  @IsOptional()
  level: TrainingLevel;
}

export class TrainingFilter {
  @Type(() => Number)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  limit = MAX_LIMIT;

  @Type(() => Number)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  page = DEFAULT_PAGE;

  @Type(() => Number)
  @IsNumber()
  priceTo = 0;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  priceFrom: number;

  @Type(() => Number)
  @IsNumber()
  caloriesTo = 1000;

  @Type(() => Number)
  @IsNumber()
  caloriesFrom = 5000;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  ratingTo: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  ratingFrom: number;

  @IsEnum(TrainingDuration, { each: true })
  @IsOptional()
  duration: TrainingDuration[];

  @IsEnum(TrainingType, { each: true })
  @IsOptional()
  type: TrainingType[];

  @IsEnum(TrainingSorting)
  sorting: TrainingSorting = TrainingSorting.Created;

  @IsEnum(TrainingSortDirection)
  direction: TrainingSortDirection = TrainingSortDirection.Desc;
}

export class TrainingOrderFilter extends Pagination {
  @IsEnum(StatisticSorting)
  sorting: StatisticSorting = StatisticSorting.OrderCount;
}

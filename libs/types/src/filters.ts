import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { Location, TrainingDuration, TrainingLevel, TrainingType } from './common';

export const MAX_LIMIT = 50;
export const DEFAULT_PAGE = 1;

export enum UserSorting {
  Created = 'createdAt',
  Role = 'role',
}

export enum TrainingSorting {
  Created = 'createdAt',
  Price = 'price',
}

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum StatisticSorting {
  OrderCount = 'ordersCount',
  OrderSumm = 'ordersSumm',
}

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

  @IsEnum(Location)
  @IsOptional()
  location: Location;

  @IsEnum(TrainingType, { each: true })
  @IsOptional()
  type: TrainingType[];

  @IsEnum(TrainingLevel)
  @IsOptional()
  level: TrainingLevel;
}

export class TrainingFilter extends Pagination {
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
  rating: number;

  @IsEnum(TrainingDuration, { each: true })
  @IsOptional()
  duration: TrainingDuration[];

  @IsEnum(TrainingType, { each: true })
  @IsOptional()
  type: TrainingType[];

  @IsEnum(TrainingSorting)
  sorting: TrainingSorting = TrainingSorting.Created;
}

export class TrainingOrderFilter extends Pagination {
  @IsEnum(StatisticSorting)
  sorting: StatisticSorting = StatisticSorting.OrderCount;
}

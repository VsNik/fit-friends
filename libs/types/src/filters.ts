import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Location, TrainingDuration, TrainingLevel, TrainingType } from './common';
import {Type} from "class-transformer";

export enum UserSorting {
  Created = 'createdAt',
  Role = 'role',
}

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

enum StatisticSorting {
  OrderCount = 'ordersCount',
  OrderSumm = 'ordersSumm',
}

export class Pagination {
  @Type(() => Number)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  limit = 50;

  @Type(() => Number)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  page = 1;
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

  @IsEnum(SortDirection)
  @IsOptional()
  direction: SortDirection = SortDirection.Desc;
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

  @IsNumber()
  @IsOptional()
  rating: number;

  @IsEnum(TrainingDuration, { each: true })
  @IsOptional()
  duration: TrainingDuration[];
}

export class TrainingOrderFilter extends Pagination {
  @IsEnum(StatisticSorting)
  sorting: StatisticSorting = StatisticSorting.OrderCount;

  @IsEnum(SortDirection)
  direction: SortDirection = SortDirection.Desc;
}

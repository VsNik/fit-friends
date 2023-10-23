import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { Location, TrainingDuration, TrainingLevel, TrainingType } from './common';

export enum UserSorting {
  Created = 'createdAt',
  Role = 'role',
}

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export class Pagination {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  limit = 50;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  page = 1;
}

export class UsersFilter extends Pagination {
  @IsEnum(UserSorting)
  sorting: UserSorting = UserSorting.Created;

  @IsEnum(Location)
  location: Location;

  @IsEnum(TrainingType, { each: true })
  type: TrainingType[];

  @IsEnum(TrainingLevel)
  level: TrainingLevel;

  @IsEnum(SortDirection)
  direction: SortDirection = SortDirection.Desc;
}

export class TrainingsFilter extends Pagination {
  @IsNumber()
  priceTo = 0;

  @IsNumber()
  priceFrom: number;

  @IsNumber()
  caloriesTo = 1000;

  @IsNumber()
  caloriesFrom = 5000;

  @IsNumber()
  rating: number;

  @IsEnum(TrainingDuration, { each: true })
  duration: TrainingDuration[];
}

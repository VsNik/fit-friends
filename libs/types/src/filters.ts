import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { Location, TrainingLevel, TrainingType } from './common';

export enum UserSorting {
  Created = 'createdAt',
  Role = 'role',
}

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export class UsersFilter {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  limit = 50;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsPositive()
  page = 1;

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

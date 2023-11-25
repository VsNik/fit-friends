// import { TrainingFilter } from '../store/trainings/trainings-slice';
import { TrainingSortDirection, Role, SortDirection, TrainingSorting, StatisticSorting } from '@fit-friends/shared';
import { TrainingFilter, UsersFilters } from '../types/state-type';

export const getUsersQuery = (
  filters: UsersFilters, 
  sorting: Role | null, 
  direction: SortDirection, 
  page: number = 1, 
  offset?: number
): string => {
  let query = `?page=${page}`;
  let location = '';
  let type = '';

  if (offset) {
    query = `${query}&offset=${offset}`;
  }

  if (filters.location) {
    for (const locationItem of filters.location) {
      location = `${location}&location=${locationItem}`;
    }
    query = `${query}${location}`;
  }

  if (filters.types) {
    for (const typeItem of filters.types) {
      type = `${type}&type=${typeItem}`;
    }
    query = `${query}${type}`;
  }

  if (filters.level) {
    query = `${query}&level=${filters.level}`;
  }

  if (sorting) {
    query = `${query}&sort=${sorting}`;
  }

  if (direction) {
    query = `${query}&direction=${direction};`;
  }

  return query;
};

export const getTrainingsQuery = (
  filter: TrainingFilter,
  sorting: TrainingSorting,
  direction: TrainingSortDirection,
  page: number = 1,
): string => {
  const { priceTo, priceFrom, caloriesTo, caloriesFrom, ratingTo, ratingFrom, types } = filter;
  let query = `?page=${page}`;
  let type = '';

  if (priceTo) {
    query = `${query}&priceTo=${priceTo}`;
  }

  if (priceFrom) {
    query = `${query}&priceFrom=${priceFrom}`;
  }

  if (caloriesTo) {
    query = `${query}&caloriesTo=${caloriesTo}`;
  }

  if (caloriesFrom) {
    query = `${query}&caloriesFrom=${caloriesFrom}`;
  }

  if (ratingTo) {
    query = `${query}&ratingTo=${ratingTo}`;
  }

  if (ratingFrom) {
    query = `${query}&ratingFrom=${ratingFrom}`;
  }

  if (types) {
    for (const typeItem of types) {
      type = `${type}&type=${typeItem}`;
    }
    query = `${query}${type}`;
  }

  query = `${query}&sorting=${sorting}&direction=${direction ?? SortDirection.Desc}`;

  return query;
};

export const getMyOrdersQuery = (sorting: StatisticSorting, direction: TrainingSortDirection, page = 1) => {
  return `?page=${page}&sorting=${sorting}&direction=${direction}`;
}

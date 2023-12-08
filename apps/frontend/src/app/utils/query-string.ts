import { TrainingSortDirection, SortDirection, TrainingSorting, StatisticSorting, UserSorting } from '@fit-friends/shared';
import { TrainingFilter, UsersFilters } from '../types/state-type';
import { CardsOnPage } from '../constants/common';

const createTrainingRangeQuery = (filters: TrainingFilter, query: string) => {
  const { priceTo, priceFrom, caloriesTo, caloriesFrom, ratingTo, ratingFrom } = filters;

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

  return query;
};

export const getUsersQuery = (filters: UsersFilters, sorting: UserSorting, direction: SortDirection | null, page: number = 1, offset?: number): string => {
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
    query = `${query}&sorting=${sorting}`;
  }

  if (direction) {
    query = `${query}&direction=${direction}`;
  }

  return query;
};

export const getTrainingsQuery = (filters: TrainingFilter, sorting: TrainingSorting, direction: TrainingSortDirection, page: number = 1): string => {
  let query = `?page=${page}`;
  let type = '';

  query = createTrainingRangeQuery(filters, query);

  if (filters.types) {
    for (const typeItem of filters.types) {
      type = `${type}&type=${typeItem}`;
    }
    query = `${query}${type}`;
  }

  return `${query}&sorting=${sorting}&direction=${direction ?? SortDirection.Desc}`;
};

export const getMyOrdersQuery = (sorting: StatisticSorting, direction: TrainingSortDirection, page = 1) => {
  return `?page=${page}&sorting=${sorting}&direction=${direction}`;
};

export const getMyTrainingsQuery = (filters: TrainingFilter, page = 1, perPage = CardsOnPage.MyTraining) => {
  let query = `?page=${page}&limit=${perPage}&direction=${SortDirection.Asc}`;
  let duration = '';

  query = createTrainingRangeQuery(filters, query);

  if (filters.durations) {
    for (const durationItem of filters.durations) {
      duration = `${duration}&duration=${durationItem}`;
    }
    query = `${query}${duration}`;
  }

  return query;
};

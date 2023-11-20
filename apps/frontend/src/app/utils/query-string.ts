import {UsersFilter} from "../store/users/users-slice";
import {Role, SortDirection} from "@fit-friends/shared";

export const getUsersQuery = (filters: UsersFilter, sorting: Role | null, direction: SortDirection, page: number = 1, offset?: number) => {
  let query = `?page=${page}`;
  let location = '';
  let type = '';

  if (offset) {
    query = `${query}&offset=${offset}`
  }

  if (filters.location) {
    for (const locationItem of filters.location) {
      location = `${location}&location=${locationItem}`;
    }
    query = `${query}${location}`;
  }

  if (filters.type) {
    for (const typeItem of filters.type) {
      type = `${type}&type=${typeItem}`;
    }
    query = `${query}${type}`
  }

  if (filters.level) {
    query = `${query}&level=${filters.level}`
  }

  if (sorting) {
    query = `${query}&sort=${sorting}`;
  }

  if (direction) {
    query = `${query}&direction=${direction};`
  }

  return query;
}
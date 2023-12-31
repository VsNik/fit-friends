import React, { ChangeEvent } from 'react';
import { SortDirection, UserSorting } from '@fit-friends/shared';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  setAllLocationsAction,
  setAllTypesAction,
  setDirectionAction,
  setLevelAction,
  setLocationAction,
  setSortingAction,
  setTypeAction,
} from '../../store/users/users-slice';
import { CheckTypes } from '../ui/check-types/check-types';
import { CheckLevel } from '../ui/check-level/check-level';
import { ButtonsSortingRole } from '../ui/buttons-sorting-role/buttons-sorting-role';
import { CheckLocations } from '../ui/check-locations/check-locations';
import { UsersFilters } from '../../types/state-type';
import { ButtonFloat } from '../ui/button-float/button-float';
import { LoadStatus } from '../../constants/common';
import * as usersSelector from '../../store/users/users-select';

interface UsersFilterProps {
  filter: UsersFilters;
  sorting?: UserSorting;
  direction: SortDirection | null;
}

export const UsersFilter: React.FC<UsersFilterProps> = (props) => {
  const { filter, direction } = props;

  const dispatch = useAppDispatch();
  const loadStatus = useAppSelector(usersSelector.loadStatus);
  const isLoading = loadStatus === LoadStatus.Loading;

  const setLocations = (evt: ChangeEvent<HTMLInputElement>) => dispatch(setLocationAction(evt.target.value));
  const setTypes = (evt: ChangeEvent<HTMLInputElement>) => dispatch(setTypeAction(evt.target.value));
  const setLevel = (evt: ChangeEvent<HTMLInputElement>) => dispatch(setLevelAction(evt.target.value));
  const setDirection = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDirectionAction(evt.target.value));
    dispatch(setSortingAction(UserSorting.Role));
  };
  const setllLocations = () => dispatch(setAllLocationsAction());
  const setAllTypes = () => dispatch(setAllTypesAction());

  return (
    <form className="user-catalog-form__form" data-testid='users-filter-component'>
      <div className="user-catalog-form__block user-catalog-form__block--location">
        <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
        <CheckLocations
          name="location"
          locations={filter.location}
          onChange={setLocations}
          disabled={isLoading}
          dataTestId="checkbox-location-group"
        />

        <ButtonFloat
          text="Посмотреть все"
          icon="arrow-down"
          className="btn-show-more user-catalog-form__btn-show"
          onClick={setllLocations}
          iconLeft
          dataTestId="all-location-button"
        />
      </div>

      <div className="user-catalog-form__block user-catalog-form__block--spezialization">
        <h4 className="user-catalog-form__block-title">Специализация</h4>
        <CheckTypes
          name="trainingType"
          types={filter.types}
          className="user-catalog-form__check-list"
          onChange={setTypes}
          disabled={isLoading}
          dataTestId="checkbox-type-group"
        />

        <ButtonFloat
          text="Посмотреть все"
          icon="arrow-down"
          className="btn-show-more user-catalog-form__btn-show"
          onClick={setAllTypes}
          iconLeft
          dataTestId="all-type-button"
        />
      </div>

      <div className="user-catalog-form__block user-catalog-form__block--level">
        <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
        <CheckLevel name="trainingLevel" level={filter.level} onChange={setLevel} disabled={isLoading} dataTestId="radio-level-group" />
      </div>

      <div className="user-catalog-form__block">
        <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
        <ButtonsSortingRole direction={direction} onChange={setDirection} disabled={isLoading} dataTestId="sorting-role-group" />
      </div>
    </form>
  );
};

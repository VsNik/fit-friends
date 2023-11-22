import React, { ChangeEvent } from 'react';
import { Role } from '@fit-friends/shared';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setLevel, setLocation, setSorting, setType } from '../../store/users/users-slice';
import { CheckTypes } from '../ui/check-types/check-types';
import { CheckLevel } from '../users/check-level/check-level';
import { ButtonsSortingRole } from '../ui/buttons-sorting-role/buttons-sorting-role';
import { CheckLocations } from '../ui/check-locations/check-locations';
import { UsersFilters } from '../../types/state-type';
import * as usersSelector from '../../store/users/users-select';

interface UsersFilterProps {
  filter: UsersFilters;
  sorting: Role | null;
}

export const UsersFilter: React.FC<UsersFilterProps> = (props) => {
  const { filter, sorting } = props;

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(usersSelector.isLoading);

  const handleSetLocations = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLocation(evt.target.value));
  };

  const handleSetTypes = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setType(evt.target.value));
  };

  const handleSetLevel = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setLevel(evt.target.value));
  };

  const handleSetSorting = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSorting(evt.target.value));
  };

  return (
    <form className="user-catalog-form__form">
      <div className="user-catalog-form__block user-catalog-form__block--location">
        <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
        <CheckLocations 
          name="location" 
          locations={filter.location} 
          onChange={handleSetLocations} 
          disabled={isLoading} 
        />

        <button className="btn-show-more user-catalog-form__btn-show" type="button">
          <span>Посмотреть все</span>
          <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#arrow-down" />
          </svg>
        </button>
      </div>

      <div className="user-catalog-form__block user-catalog-form__block--spezialization">
        <h4 className="user-catalog-form__block-title">Специализация</h4>
        <CheckTypes
          name="trainingType"
          types={filter.types}
          className="user-catalog-form__check-list"
          onChange={handleSetTypes}
          disabled={isLoading}
        />

        <button className="btn-show-more user-catalog-form__btn-show" type="button">
          <span>Посмотреть все</span>
          <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#arrow-down" />
          </svg>
        </button>
      </div>

      <div className="user-catalog-form__block user-catalog-form__block--level">
        <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
        <CheckLevel name="trainingLevel" level={filter.level} onChange={handleSetLevel} disabled={isLoading} />
      </div>

      <div className="user-catalog-form__block">
        <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
        <ButtonsSortingRole sorting={sorting} onChange={handleSetSorting} disabled={isLoading} />
      </div>
    </form>
  );
};

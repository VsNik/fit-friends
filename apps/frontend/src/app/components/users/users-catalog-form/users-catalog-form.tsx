import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { UsersFilter, setLevel, setLocation, setSorting, setType } from '../../../store/users/users-slice';
import { LocationCheckboxGroup } from '../../location-checkbox-group/location-checkbox-group';
import { UserCatalogTypes } from '../user-catalog-types/user-catalog-types';
import { UserCatalogLevel } from '../user-catalog-level/user-catalog-level';
import { ButtonsSorting } from '../buttons-sorting/buttons-sorting';
import { Role } from '@fit-friends/shared';

interface UserCatalogFormProps {
  filter: UsersFilter;
  sorting: Role | null;
}

export const UserCatalogForm: React.FC<UserCatalogFormProps> = (props) => {
  const { filter, sorting } = props;

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.users.isLoading);

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
        <LocationCheckboxGroup name='location' locations={filter.location} onChange={handleSetLocations} disabled={isLoading} />
        <button className="btn-show-more user-catalog-form__btn-show" type="button">
          <span>Посмотреть все</span>
          <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#arrow-down" />
          </svg>
        </button>
      </div>

      <div className="user-catalog-form__block user-catalog-form__block--spezialization">
        <h4 className="user-catalog-form__block-title">Специализация</h4>
        <UserCatalogTypes name='trainingType' types={filter.type} onChange={handleSetTypes} disabled={isLoading} />
        <button className="btn-show-more user-catalog-form__btn-show" type="button">
          <span>Посмотреть все</span>
          <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#arrow-down" />
          </svg>
        </button>
      </div>

      <div className="user-catalog-form__block user-catalog-form__block--level">
        <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
        <UserCatalogLevel name='trainingLevel' level={filter.level} onChange={handleSetLevel} disabled={isLoading} />
      </div>

      <div className="user-catalog-form__block">
        <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
        <ButtonsSorting sorting={sorting} onChange={handleSetSorting} disabled={isLoading} />
      </div>
    </form>
  );
};

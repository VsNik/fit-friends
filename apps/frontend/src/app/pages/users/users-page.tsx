import React, { useEffect } from 'react';
import { AppLayout } from '../../components/layouts/app-layout';
import { UserCatalogForm } from '../../components/users/users-catalog-form/users-catalog-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUsersAction } from '../../store/users/async-actions';
import { UserCatalog } from '../../components/users/user-catalog/user-catalog';

export const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.users.filter);
  const sorting = useAppSelector((state) => state.users.sorting);
  const direction = useAppSelector((state) => state.users.direction);

  useEffect(() => {
    dispatch(fetchUsersAction(''));
  }, [dispatch, filters, sorting, direction]);

  return (
    <AppLayout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Каталог пользователей</h1>

            <div className="user-catalog-form">
              <h2 className="visually-hidden">Каталог пользователя</h2>
              <div className="user-catalog-form__wrapper">
                <button className="btn-flat btn-flat--underlined user-catalog-form__btnback" type="button">
                  <svg width="14" height="10" aria-hidden="true">
                    <use xlinkHref="/assets/img/sprite.svg#arrow-left" />
                  </svg>
                  <span>Назад</span>
                </button>
                <h3 className="user-catalog-form__title">Фильтры</h3>
                <UserCatalogForm filter={filters} sorting={sorting} />
              </div>
            </div>

            <div className="inner-page__content">
              <UserCatalog />
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

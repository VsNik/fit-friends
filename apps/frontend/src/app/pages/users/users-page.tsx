import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../../components/layouts/app-layout';
import { UsersFilter } from '../../components/users-filter/users-filter';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUsersAction } from '../../store/users/async-actions';
import { UserCatalog } from '../../components/users/user-catalog/user-catalog';
import { ButtonFloat } from '../../components/ui/button-float/button-float';
import { getUsersQuery } from '../../utils/query-string';
import * as usersSelector from '../../store/users/users-select';
import { RouteName } from '../../constants/route';

export const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const filters = useAppSelector(usersSelector.filter);
  const sorting = useAppSelector(usersSelector.sorting);
  const direction = useAppSelector(usersSelector.direction);

  useEffect(() => {
    const queryString = getUsersQuery(filters, sorting, direction)
    dispatch(fetchUsersAction(queryString));
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
                <ButtonFloat 
                    text='Назад' 
                    icon='arrow-left'
                    onClick={() => navigate(RouteName.Home)}
                    className='user-catalog-form__btnback' 
                    underline 
                />
                <h3 className="user-catalog-form__title">Фильтры</h3>
                <UsersFilter filter={filters} sorting={sorting} />
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

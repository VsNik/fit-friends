import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Role } from '@fit-friends/shared';
import { RouteName } from '../../app';
import { AppLayout } from '../../components/layouts/app-layout';
import { UserCardUser } from '../../components/user-card/user-card-user/user-card-user';
import { ButtonFloat } from '../../components/ui/button-float/button-float';
import { UserCardCoach } from '../../components/user-card/user-card-coach/user-card-coach';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserAction } from '../../store/user/async-actions';
import { MapPopup } from '../../components/popups/map-popup/map-popup';
import { isNotEmptyObject } from '../../utils/helpers';
import * as userSelector from '../../store/user/user-select';
import clsx from 'clsx';

export const UserPage: React.FC = () => {
  const [openMap, setOpenMap] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const user = useAppSelector(userSelector.user);
  const isLoading = useAppSelector(userSelector.isLoading);
  // const { user, isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);

  const handleOpenMap = () => {
    document.body.classList.add('scroll-lock');
    document.body.style.paddingRight = '15px';
    setOpenMap(true);
  };

  const handleCloseMap = () => {
    setOpenMap(false);
    document.body.classList.remove('scroll-lock');
    document.body.style.paddingRight = '';
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <AppLayout>
      <div className="inner-page inner-page--no-sidebar">
        <div className="container">
          <div className="inner-page__wrapper">
            <ButtonFloat 
              text="Назад" 
              icon="arrow-left" 
              className="inner-page__back" 
              onClick={() => navigation(RouteName.Home)} 
            />

            <div className="inner-page__content">
              {user?.role === Role.User 
                ? <UserCardUser user={user} onOpenMap={handleOpenMap} /> 
                : <UserCardCoach user={user} onOpenMap={handleOpenMap} />
              }
            </div>
          </div>
        </div>
      </div>

      {isNotEmptyObject(user) && (
        <div className={clsx('modal', { 'is-active': openMap })}>
          <MapPopup onClose={handleCloseMap} title={user.name} location={user.location} />
        </div>
      )}
    </AppLayout>
  );
};

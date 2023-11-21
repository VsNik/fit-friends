import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../../app';
import { AppLayout } from '../../components/layouts/app-layout';
import { UserCard } from '../../components/user-card/user-card';
import { fakeUserList } from '../../fake-data/fake-user';
import { MapPopup } from '../../components/popups/map-popup/map-popup';
import { ButtonFloat } from '../../components/ui/button-float/button-float';
import clsx from 'clsx';

export const UserPage: React.FC = () => {
  const navigation = useNavigate();
  const [openMap, setOpenMap] = useState<boolean>(false);
  const user = fakeUserList[0];

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

  return (
    <AppLayout>
      <div className="inner-page inner-page--no-sidebar">
        <div className="container">
          <div className="inner-page__wrapper">
            <ButtonFloat text="Назад" icon="arrow-left" className="inner-page__back" onClick={() => navigation(RouteName.Home)} />

            <div className="inner-page__content">
              <UserCard user={user} onOpenMap={handleOpenMap} />
            </div>
          </div>
        </div>
      </div>

      <div className={clsx('modal', { 'is-active': openMap })}>
        <MapPopup onClose={handleCloseMap} title={user.name} location={user.location} />
      </div>
    </AppLayout>
  );
};

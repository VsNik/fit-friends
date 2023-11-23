import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Role } from '@fit-friends/shared';
import { AppLayout } from '../../components/layouts/app-layout';
import { UserCardUser } from '../../components/user-card/user-card-user/user-card-user';
import { ButtonFloat } from '../../components/ui/button-float/button-float';
import { UserCardCoach } from '../../components/user-card/user-card-coach/user-card-coach';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchUserAction } from '../../store/user/async-actions';
import { MapPopup } from '../../components/popups/map-popup/map-popup';
import { isNotEmptyObject } from '../../utils/helpers';
import { RouteName } from '../../constants/route';
import { Modal } from '../../components/ui/modal/modal';
import * as userSelector from '../../store/user/user-select';

export const UserPage: React.FC = () => {
  const [openMap, setOpenMap] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const user = useAppSelector(userSelector.user);
  const isLoading = useAppSelector(userSelector.isLoading);

  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);

  const handleOpenMap = () => {
    setOpenMap(true);
  };

  const handleCloseMap = () => {
    setOpenMap(false);
  };

  if (isLoading || !isNotEmptyObject(user)) {
    return <h3>Loading...</h3>;
  }

  return (
    <AppLayout>
      <div className="inner-page inner-page--no-sidebar">
        <div className="container">
          <div className="inner-page__wrapper">
            <ButtonFloat text="Назад" icon="arrow-left" className="inner-page__back" onClick={() => navigation(RouteName.Home)} />

            <div className="inner-page__content">
              {user?.role === Role.User ? (
                <UserCardUser user={user} onOpenMap={handleOpenMap} />
              ) : (
                <UserCardCoach user={user} onOpenMap={handleOpenMap} />
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={openMap} onClose={handleCloseMap}>
        <MapPopup onClose={handleCloseMap} title={user.name} location={user.location} />
      </Modal>
    </AppLayout>
  );
};

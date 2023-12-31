import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAuthAction } from '../../store/user/async-actions';
import { AppLayout } from '../../components/layouts/app-layout/app-layout';
import * as authSelectors from '../../store/auth/auth-select';
import * as userSelectors from '../../store/user/user-select';
import { UserInfo } from '../../components/accounts/user-info/user-info';
import { Role } from '@fit-friends/shared';
import { UserCalories } from '../../components/accounts/user-calories/user-calories';
import { UserNavigation } from '../../components/accounts/user-vavigation/user-vavigation';
import { CoachNavigation } from '../../components/accounts/coach-navigation/coach-navigation';
import { CertificateSlider } from '../../components/certificate-slider/certificate-slider';
import { Button } from '../../components/ui/button/button';
import { sendNotificationAction } from '../../store/notifications/async-actions';

export const AccountPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const authRole = useAppSelector(authSelectors.authRole);
  const authUser = useAppSelector(userSelectors.user);

  useEffect(() => {
    dispatch(fetchAuthAction());
  }, [dispatch]);

  const handleSendNotify = () => {
    dispatch(sendNotificationAction())
  }

  return (
    <AppLayout>
      <section className="inner-page">
        <div className="container">
          <div className="inner-page__wrapper">
            <h1 className="visually-hidden">Личный кабинет</h1>
            <UserInfo user={authUser} />
            <div className="inner-page__content">
              {authRole === Role.User && (
                <div className="personal-account-user" data-testid="user-account-page">
                  <UserCalories calories={authUser.loseCalories!} />
                  <UserNavigation />
                </div>
              )}
              {authRole === Role.Coach && (
                <div className="personal-account-coach" data-testid="coach-account-page">
                  <CoachNavigation />
                  <CertificateSlider user={authUser} />

                  <div style={{ textAlign: 'center' }}>
                    <Button text="Разослать уведомление" className="notifications-send" onClick={handleSendNotify} dataTestId='send-totify-button' />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

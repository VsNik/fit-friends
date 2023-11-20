import React from 'react';
import { CoachNavigation } from '../coach-navigation/coach-navigation';
import { CertificateSlider } from '../../certificate-slider/certificate-slider';
import { UserInfo } from '../user-info/user-info';
import { CoachType } from '@fit-friends/shared';

interface CoachAccountProps {
  user: CoachType;
}

export const CoachAccount: React.FC<CoachAccountProps> = ({ user }) => {
  return (
    <div className="inner-page__wrapper">
      <h1 className="visually-hidden">Личный кабинет</h1>
      <UserInfo user={user} />
      <div className="inner-page__content">
        <div className="personal-account-coach"></div>
        <CoachNavigation />
        <CertificateSlider user={user} />
      </div>
    </div>
  );
};

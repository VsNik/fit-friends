import React from 'react';
import { UserType } from '@fit-friends/shared';
import { UserInfo } from '../user-info/user-info';
import { UserCalories } from '../user-calories/user-calories';
import { UserNavigation } from '../user-vavigation/user-vavigation';

interface UserAccountProps {
  user: UserType;
}

export const UserAccount: React.FC<UserAccountProps> = ({ user }) => {
  return (
    <div className="inner-page__wrapper">
      <h1 className="visually-hidden">Личный кабинет</h1>
      <UserInfo user={user}  />

      <div className="inner-page__content">
        <div className="personal-account-user">
          <UserCalories calories={user.loseCalories!} />
          <UserNavigation />
        </div>
      </div>
    </div>
  );
};

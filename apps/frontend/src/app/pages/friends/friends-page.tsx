import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Role } from '@fit-friends/shared';
import * as authSelector from '../../store/auth/auth-select';
import { useAppSelector } from '../../store/hooks';
import { AppLayout } from '../../components/layouts/app-layout';
import { CoachFriends } from '../../components/friends/coach-friends/coach-friends';
import { UserFriends } from '../../components/friends/user-friends/userFriends';
import { ButtonFloat } from '../../components/ui/button-float/button-float';
import { RouteName } from '../../constants/route';

export const FriendsPage: React.FC = () => {
  const navigate = useNavigate();
  const authId = useAppSelector(authSelector.authId);
  const authRole = useAppSelector(authSelector.authRole);

  return (
    <AppLayout>
      <section className="friends-list">
        <div className="container">
          <div className="friends-list__wrapper">
            <ButtonFloat 
              text="Назад" 
              icon="arrow-left" 
              className="friends-list__back" 
              onClick={() => navigate(RouteName.Home)} 
            />

            <div className="friends-list__title-wrapper">
              <h1 className="friends-list__title">Мои друзья</h1>
            </div>
            
            {authRole === Role.User 
              ? <UserFriends userId={authId} /> 
              : <CoachFriends userId={authId} />
            }
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

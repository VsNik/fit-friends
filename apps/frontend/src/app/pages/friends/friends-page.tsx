import React from 'react';
import { Role } from '@fit-friends/shared';
import * as authSelector from '../../store/auth/auth-select';
import { useAppSelector } from '../../store/hooks';
import { AppLayout } from '../../components/layouts/app-layout';
import { CoachFriends } from '../../components/friends/coach-friends/coach-friends';
import { UserFriends } from '../../components/friends/user-friends/userFriends';

export const FriendsPage: React.FC = () => {
  const authId = useAppSelector(authSelector.authId);
  const authRole = useAppSelector(authSelector.authRole);

  return (
    <AppLayout>
      <section className="friends-list">
        <div className="container">
            {authRole === Role.User 
                ? <UserFriends userId={authId} />
                : <CoachFriends userId={authId} />
            }
        </div>
      </section>
    </AppLayout>
  );
};

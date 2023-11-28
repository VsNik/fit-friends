import React, { useEffect } from 'react';
import { Role } from '@fit-friends/shared';
import { AppLayout } from '../../components/layouts/app-layout';
import { CoachAccount } from '../../components/accounts/coach-account/coach-account';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAuthAction } from '../../store/user/async-actions';
import { UserAccount } from '../../components/accounts/user-account/user-account';
import * as authSelectors from '../../store/auth/auth-select';
import * as userSelectors from '../../store/user/user-select';

export const AccountPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const authRole = useAppSelector(authSelectors.authRole);
  const authUser = useAppSelector(userSelectors.user);

  useEffect(() => {
    dispatch(fetchAuthAction());
  }, [dispatch]);

  return (
    <AppLayout>
      <section className="inner-page">
        <div className="container">
          {authRole === Role.Coach && <CoachAccount user={authUser} />}
          {authRole === Role.User && <UserAccount user={authUser} />}
        </div>
      </section>
    </AppLayout>
  );
};

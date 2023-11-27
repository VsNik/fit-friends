import React, { useEffect } from 'react';
import { AppLayout } from '../../components/layouts/app-layout';
import { CoachAccount } from '../../components/accounts/coach-account/coach-account';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Role } from '@fit-friends/shared';
import { fetchAuthAction } from '../../store/user/async-actions';
import * as authSelectors from '../../store/auth/auth-select';
import * as userSelectors from '../../store/user/user-select';
import { UserAccount } from '../../components/accounts/user-account/user-account';

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

import React, { useEffect } from 'react';
import { AppLayout } from '../../components/layouts/app-layout';
import { CoachAccount } from '../../components/accounts/coach-account/coach-account';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Role } from '@fit-friends/shared';
import { fetchUserAction } from '../../store/user/async-actions';
import * as authSelectors from '../../store/auth/auth-select';
import { UserAccount } from '../../components/accounts/user-account/user-account';
import { Loader } from '../../components/loader/loader';

export const AccountPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(authSelectors.authUser);
  const isLoading = useAppSelector(authSelectors.isLoading);

  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />
  }

  return (
    <AppLayout>
      <section className="inner-page">
        <div className="container">
          {authUser.role === Role.Coach && <CoachAccount user={authUser} />}
          {authUser.role === Role.User && <UserAccount user={authUser} />}
        </div>
      </section>
    </AppLayout>
  );
};

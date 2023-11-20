import React, { useEffect } from 'react';
import { AppLayout } from '../../components/layouts/app-layout';
import { CoachAccount } from '../../components/accounts/coach-account/coach-account';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Role } from '@fit-friends/shared';
import { fetchUserAction } from '../../store/user/async-actions';

export const AccountPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {authUser} = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUserAction());
  }, [dispatch]);

  return (
    <AppLayout>
      <section className="inner-page">
        <div className="container">
          {authUser.role === Role.Coach && <CoachAccount user={authUser} />}
          {authUser.role === Role.User && <h1>User account</h1>}
        </div>
      </section>
    </AppLayout>
  );
};

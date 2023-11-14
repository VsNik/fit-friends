import React from 'react';
import { AppLayout } from '../../components/layouts/app-layout';
import { CoachAccount } from '../../components/accounts/coach-account/coach-account';
import { useAppSelector } from '../../store/hooks';
import { Role } from '@fit-friends/shared';

export const AccountPage: React.FC = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <AppLayout>
      <section className="inner-page">
        <div className="container">
          {user.role === Role.Coach && <CoachAccount user={user} />}
          {user.role === Role.User && <h1>User account</h1>}
        </div>
      </section>
    </AppLayout>
  );
};

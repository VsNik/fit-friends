import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RouteName } from '../../app';
import { Role } from '@fit-friends/shared';
import { useAppSelector } from '../../store/hooks';
import { getAccountRoute } from '../../utils/route';

interface ProtectedRouteProps {
    accessRole?: Role;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ accessRole }) => {
  const isAuth = useAppSelector(state => state.auth.isAuth);
  const {role, id} = useAppSelector(state => state.auth.authUser);

  if (!isAuth) {
    return <Navigate to={RouteName.Intro} replace />;
  }

  if (accessRole && accessRole !== role) {
    return role === Role.User
        ? <Navigate to={RouteName.Home} replace />
        : <Navigate to={getAccountRoute(id)} replace />;

    // if (role === Role.User) {
    //   return <Navigate to={RouteName.Home} replace />;
    // } else {
    //   return <Navigate to={getAccountRoute(id)} replace />;
    // }
  }

  return <Outlet />
};

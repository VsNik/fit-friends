import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Role } from '@fit-friends/shared';
import { useAppSelector } from '../../../store/hooks';
import { RouteName } from '../../../constants/route';
import * as authSelector from '../../../store/auth/auth-select';

interface ProtectedRouteProps {
  accessRole?: Role;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ accessRole }) => {
  const isAuth = useAppSelector(authSelector.isAuth);
  const role = useAppSelector(authSelector.authRole);

  if (!isAuth) {
    return <Navigate to={RouteName.Intro} replace />;
  }

  if (accessRole && accessRole !== role) {
    return role === Role.User 
      ? <Navigate to={RouteName.Home} replace /> 
      : <Navigate to={RouteName.Account} replace />;
  }

  return <Outlet />;
};

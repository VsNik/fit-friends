import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Role } from '@fit-friends/shared';
import { useAppSelector } from '../../../store/hooks';
import { RouteName } from '../../../constants/route';
import * as authSelector from '../../../store/auth/auth-select';

interface ProtectedRouteProps {
  accessRole?: Role;
  redirect?: RouteName;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ accessRole, redirect }) => {
  const isAuth = useAppSelector(authSelector.isAuth);
  const role = useAppSelector(authSelector.authRole);

  if (!isAuth) {
    return <Navigate to={RouteName.Intro} replace />;
  }

  if (accessRole && accessRole !== role) {
    if (redirect) {
      return <Navigate to={redirect} replace />
    }
    
    return role === Role.User 
      ? <Navigate to={RouteName.Home} replace /> 
      : <Navigate to={RouteName.Account} replace />;
  }

  return <Outlet />;
};

import React from 'react';
import { Role } from '@fit-friends/shared';
import { Navigate, Outlet } from 'react-router-dom';
import * as authSelector from '../../../store/auth/auth-select';
import { useAppSelector } from '../../../store/hooks';
import { RouteName } from '../../../constants/route';

export const AnonimousRoute: React.FC = () => {
  const isAuth = useAppSelector(authSelector.isAuth);
  const role = useAppSelector(authSelector.authRole);

  if (isAuth) {
    return role === Role.User 
        ? <Navigate to={RouteName.Home} replace /> 
        : <Navigate to={RouteName.Account} replace />;
  }

  return <Outlet />;
};

import React from 'react';
import { useLocation, matchRoutes } from 'react-router-dom';
import { RouteName } from '../../../constants/route';
import { Notifications } from '../notifications/notifications';
import { TopMenuLink } from '../top-menu-link/top-menu-link';
import { useAppDispatch } from '../../../store/hooks';
import { logoutAction } from '../../../store/auth/async-actions';

export const TopMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const matchPath = (path: RouteName) => {
    const matched = matchRoutes([{ path }], pathname);
    return matched?.[0].route.path === path;
  };

  const handleLogout = () => {
    dispatch(logoutAction());
  }

  return (
    <nav className="main-nav" data-testid='top-menu-component'>
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <TopMenuLink icon="icon-home" to={RouteName.Home} isActive={matchPath(RouteName.Home)} title="На главную" dataTestId='top-menu-link' />
        </li>
        <li className="main-nav__item">
          <TopMenuLink icon="icon-user" to={RouteName.Account} isActive={matchPath(RouteName.Account)} title="Личный кабинет" dataTestId='top-menu-link' />
        </li>
        <li className="main-nav__item">
          <TopMenuLink icon="icon-friends" to={RouteName.Friends} isActive={matchPath(RouteName.Friends)} title="Друзья" dataTestId='top-menu-link' />
        </li>
        <li className="main-nav__item main-nav__item--notifications">
          <Notifications />
        </li>
        <li className="main-nav__item">
          <TopMenuLink icon="arrow-right" to='#' title="Выход" onClick={handleLogout} dataTestId='logout-link' />
        </li>
      </ul>
    </nav>
  );
};

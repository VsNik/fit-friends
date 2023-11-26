import React from 'react';
import { useLocation, matchRoutes } from 'react-router-dom';
import { RouteName } from '../../../constants/route';
import { Notifications } from '../notifications/notifications';
import { TopMenuLink } from '../top-menu-link/top-menu-link';

export const TopMenu: React.FC = () => {
  const { pathname } = useLocation();

  const matchPath = (path: RouteName) => {
    const matched = matchRoutes([{ path }], pathname);
    return matched?.[0].route.path === path;
  };

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <TopMenuLink icon="icon-home" to={RouteName.Home} isActive={matchPath(RouteName.Home)} title="На главную" />
        </li>
        <li className="main-nav__item">
          <TopMenuLink icon="icon-user" to={RouteName.Account} isActive={matchPath(RouteName.Account)} title="Личный кабинет" />
        </li>
        <li className="main-nav__item">
          <TopMenuLink icon="icon-friends" to={RouteName.Friends} isActive={matchPath(RouteName.Friends)} title="Друзья" />
        </li>
        <li className="main-nav__item main-nav__item--notifications">
          <Notifications />
        </li>
      </ul>
    </nav>
  );
};

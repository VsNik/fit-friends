import React from 'react';
import { Link, useLocation, matchRoutes } from 'react-router-dom';
import { RouteName } from '../../../constants/route';
import clsx from 'clsx';

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
          <Link
            className={clsx('main-nav__link', { 'is-active': matchPath(RouteName.Home) })}
            to={RouteName.Home}
            aria-label="На главную"
            title="На главную"
          >
            <svg width="18" height="18" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#icon-home" />
            </svg>
          </Link>
        </li>
        <li className="main-nav__item">
          <Link
            className={clsx('main-nav__link', { 'is-active': matchPath(RouteName.Account) })}
            to={RouteName.Account}
            aria-label="Личный кабинет"
            title="Личный кабинет"
          >
            <svg width="16" height="18" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#icon-user" />
            </svg>
          </Link>
        </li>
        <li className="main-nav__item">
          <Link 
            className={clsx('main-nav__link', {'is-active': matchPath(RouteName.Friends)})} 
            to={RouteName.Friends} 
            aria-label="Друзья" 
            title="Друзья"
          >
            <svg width="22" height="16" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#icon-friends" />
            </svg>
          </Link>
        </li>
        <li className="main-nav__item main-nav__item--notifications">
          <Link className="main-nav__link" to="#" aria-label="Уведомления" title="Уведомления">
            <svg width="14" height="18" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#icon-notification" />
            </svg>
          </Link>
          <div className="main-nav__dropdown">
            <p className="main-nav__label">Оповещения</p>
            <ul className="main-nav__sublist">
              <li className="main-nav__subitem">
                <Link className="notification is-active" to="#">
                  <p className="notification__text">Катерина пригласила вас на&nbsp;тренировку</p>
                  <time className="notification__time" dateTime="2023-12-23 12:35">
                    23 декабря, 12:35
                  </time>
                </Link>
              </li>
              <li className="main-nav__subitem">
                <Link className="notification is-active" to="#">
                  <p className="notification__text">Никита отклонил приглашение на&nbsp;совместную тренировку</p>
                  <time className="notification__time" dateTime="2023-12-22 09:22">
                    22 декабря, 09:22
                  </time>
                </Link>
              </li>
              <li className="main-nav__subitem">
                <Link className="notification is-active" to="#">
                  <p className="notification__text">Татьяна добавила вас в&nbsp;друзья</p>
                  <time className="notification__time" dateTime="2023-12-18 18:50">
                    18 декабря, 18:50
                  </time>
                </Link>
              </li>

              <li className="main-nav__subitem">
                <Link className="notification" to="#">
                  <p className="notification__text">Наталья приняла приглашение на&nbsp;совместную тренировку</p>
                  <time className="notification__time" dateTime="2023-12-14 08:15">
                    14 декабря, 08:15
                  </time>
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
};

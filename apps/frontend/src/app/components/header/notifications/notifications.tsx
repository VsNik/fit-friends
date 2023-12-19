import React, { Fragment } from 'react';
import { ThumbnailNotification } from '../../thumbnails/thumbnail-notification/thumbnail-notification';
import { useAppSelector } from '../../../store/hooks';
import { TopMenuLink } from '../top-menu-link/top-menu-link';
import * as notificationSelector from '../../../store/notifications/notifications-select';

export const Notifications: React.FC = () => {
  const notifications = useAppSelector(notificationSelector.notifications);

  return (
    <Fragment>
      <TopMenuLink icon="icon-notification" to='#' title="Уведомления" />

      <div className="main-nav__dropdown">
        <p className="main-nav__label">{notifications?.length ? 'Оповещения' : 'Оповещений нет'}</p>
        <ul className="main-nav__sublist">
          {notifications?.map((notification) => (
            <li key={notification.id} className="main-nav__subitem">
              <ThumbnailNotification notification={notification} />
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

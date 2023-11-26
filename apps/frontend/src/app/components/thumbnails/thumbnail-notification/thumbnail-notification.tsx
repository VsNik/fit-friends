import { IAlert } from '@fit-friends/shared';
import React from 'react';
import { Link } from 'react-router-dom';

interface ThumbnailNotificationProps {
    notification: IAlert;
}

export const ThumbnailNotification: React.FC<ThumbnailNotificationProps> = ({notification}) => {
  return (
    <Link className="notification is-active" to="#">
      <p className="notification__text">{notification.text}</p>
      <time className="notification__time" dateTime="2023-12-23 12:35">
        {notification.createdAt}
      </time>
    </Link>
  );
};

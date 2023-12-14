import { IAlert } from '@fit-friends/shared';
import React from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { removeNotificationAction } from '../../../store/notifications/async-actions';

interface ThumbnailNotificationProps {
    notification: IAlert;
}

export const ThumbnailNotification: React.FC<ThumbnailNotificationProps> = ({notification}) => {
  const dispatch = useAppDispatch();

  const handleRemoveNotify = () => {
    dispatch(removeNotificationAction(notification.id!));  
  }

  return (
    <span className="notification is-active" onClick={handleRemoveNotify}>
      <p className="notification__text" data-testid='totification-text'>{notification.text}</p>
      <time className="notification__time" dateTime="2023-12-23 12:35" data-testid='notification-date'>
        {notification.createdAt}
      </time>
    </span>
  );
};

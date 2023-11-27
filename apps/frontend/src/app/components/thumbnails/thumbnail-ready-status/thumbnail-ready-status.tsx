import { IUser, Role } from '@fit-friends/shared';
import React from 'react';

interface ThumbnailReadyStatusProps {
  user: IUser;
}

export const ThumbnailReadyStatus: React.FC<ThumbnailReadyStatusProps> = ({ user }) => {
  return user.role === Role.User ? (
    <div className={`thumbnail-friend__ready-status thumbnail-friend__ready-status--${user.ready ? 'is-ready' : 'is-not-ready'}`}>
      <span>{user.ready ? 'Готов к тренировке' : 'Не готов к тренировке'}</span>
    </div>
  ) : (
    <div className={`thumbnail-friend__ready-status thumbnail-friend__ready-status--${user.personalTraining ? 'is-ready' : 'is-not-ready'}`}>
      <span>{user.personalTraining ? 'Готов тренировать' : 'Не отов тренировать'}</span>
    </div>
  );
};

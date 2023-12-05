import React from 'react';
import { IUser } from '@fit-friends/shared';
import { Hashtag } from '../../ui/hashtag/hashtag';
import { getLevelName, getTrainingName, getUserLocation } from '../../../utils/helpers';
import { UserCardGallary } from '../user-card-gallary/user-card-gallary';
import { UserCardLabel } from '../user-card-label/user-card-label';
import { FriendsButton } from '../friends-button/friends-button';
import clsx from 'clsx';

interface UserCardUserProps {
  user: IUser;
  onOpenMap: () => void;
  isLoading?: boolean;
}

export const UserCardUser: React.FC<UserCardUserProps> = ({ user, onOpenMap, isLoading }) => {
  const position = getUserLocation(user.location);

  return (
    <section className="user-card">
      <h1 className="visually-hidden">Карточка пользователя</h1>
      <div className="user-card__wrapper">
        <div className="user-card__content">

          <div className="user-card__head">
            <h2 className="user-card__title">{user.name}</h2>
          </div>

          <UserCardLabel onOpenMap={onOpenMap} position={position.title} />

          <div className={clsx('user-card__status', { 'user-card__status--is-not-ready': !user.ready })}>
            <span>{user.ready ? 'Готов к тренировке' : 'Не готов к тренировке'}</span>
          </div>

          <div className="user-card__text">{user.bio}</div>

          <ul className="user-card__hashtag-list">
            {user.trainingType?.map((type) => (
              <li key={type} className="user-card__hashtag-item">
                <Hashtag title={getTrainingName(type)} />
              </li>
            ))}

            <li className="user-card__hashtag-item">
              <Hashtag title={getLevelName(user.trainingLevel!)} />
            </li>
          </ul>

          <FriendsButton user={user} disabled={isLoading} />
        </div>

        <UserCardGallary images={user.bgImage} className="user-card__gallary"/>
      </div>
    </section>
  );
};

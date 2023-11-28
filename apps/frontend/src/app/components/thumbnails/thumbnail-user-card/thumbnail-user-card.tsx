import React from 'react';
import { IUser, Role } from '@fit-friends/shared';
import { ButtonLink } from '../../ui/button-link/button-link';
import { getUserRoute } from '../../../utils/route';
import { Hashtag } from '../../ui/hashtag/hashtag';
import { Avatar } from '../../ui/avatar/avatar';
import { getTrainingName } from '../../../utils/helpers';
import clsx from 'clsx';

interface ThumbnailUserCardProps {
  user: IUser;
  className?: string;
  dark?: boolean;
}

export const ThumbnailUserCard: React.FC<ThumbnailUserCardProps> = ({ user, className, dark }) => {
  return (
    <div
      className={clsx('thumbnail-user', className, {
        'thumbnail-user--role-user': user.role === Role.User,
        'thumbnail-user--role-coach': user.role === Role.Coach,
        'thumbnail-user--dark': dark,
      })}
    >
      <Avatar src={user.avatar} width={82} height={82} className="thumbnail-user__image" />
      <div className="thumbnail-user__header">
        <h3 className="thumbnail-user__name">{user.name}</h3>
        <div className="thumbnail-user__location">
          <svg width="14" height="16" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-location" />
          </svg>
          <address className="thumbnail-user__location-address">{user.location}</address>
        </div>
      </div>
      <ul className="thumbnail-user__hashtags-list">
        {user.trainingType.map((type) => (
          <li key={type} className="thumbnail-user__hashtags-item">
            <Hashtag title={getTrainingName(type)} className="thumbnail-user__hashtag" />
          </li>
        ))}
      </ul>
      <ButtonLink text="Подробнее" className="thumbnail-user__button" to={getUserRoute(user.id)} medium outlined darckBg />
    </div>
  );
};

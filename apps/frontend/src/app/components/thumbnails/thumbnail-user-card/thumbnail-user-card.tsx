import { IUser, Role } from '@fit-friends/shared';
import React from 'react';
import clsx from 'clsx';
import { Image } from '../../ui/image/image';
import { Link } from 'react-router-dom';

interface ThumbnailUserCardProps {
  user: IUser;
  className?: string;
}

export const ThumbnailUserCard: React.FC<ThumbnailUserCardProps> = ({ user, className }) => {
  return (
    <div
      className={clsx('thumbnail-user', className, {
        'thumbnail-user--role-user': user.role === Role.User,
        'thumbnail-user--role-coach': user.role === Role.Coach,
      })}
    >
      {user.avatar && 
        <Image 
            src={user.avatar} 
            width={82} 
            height={82} 
            className="thumbnail-user__image" 
        />
      }
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
            <div className="hashtag thumbnail-user__hashtag">
              <span>#{type}</span>
            </div>
          </li>
        ))}
      </ul>
      <Link className="btn btn--medium thumbnail-user__button" to="#">
        Подробнее
      </Link>
    </div>
  );
};

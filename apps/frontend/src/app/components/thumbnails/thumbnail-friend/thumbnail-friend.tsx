import { IUser, Role } from '@fit-friends/shared';
import React from 'react';
import { Button } from '../../ui/button/button';
import { Hashtag } from '../../ui/hashtag/hashtag';
import { Image } from '../../ui/image/image';
import { getUserLocation } from '../../../utils/helpers';
import clsx from 'clsx';

interface ThumbnailFriendProps {
  user: IUser;
}

export const ThumbnailFriend: React.FC<ThumbnailFriendProps> = ({ user }) => {
    const location = getUserLocation(user.location);
  return (
    <li className="friends-list__item">
      <div className="thumbnail-friend">
        <div
          className={clsx('thumbnail-friend__info', {
            'thumbnail-friend__info--theme-light': user.role === Role.User,
            'thumbnail-friend__info--theme-dark': user.role === Role.Coach,
          })}
        >
          <div className="thumbnail-friend__image-status">
            {user.avatar && 
                <Image src={user.avatar} width={78} height={78} className="thumbnail-friend__image" />
            }
          </div>
          <div className="thumbnail-friend__header">
            <h2 className="thumbnail-friend__name">Виктория</h2>
            <div className="thumbnail-friend__location">
              <svg width="14" height="16" aria-hidden="true">
                <use xlinkHref="/assets/img/sprite.svg#icon-location" />
              </svg>
              <address className="thumbnail-friend__location-address">{location.title}</address>
            </div>
          </div>
          <ul className="thumbnail-friend__training-types-list">
            {user.trainingType.map((type) => (
              <li key={type}>
                <Hashtag title={type} className="thumbnail-friend__hashtag" />
              </li>
            ))}
          </ul>
          <div className="thumbnail-friend__activity-bar">
            <div className="thumbnail-friend__ready-status thumbnail-friend__ready-status--is-ready">
              <span>Готов к&nbsp;тренировке</span>
            </div>
          </div>
        </div>

        {}
        <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
          <p className="thumbnail-friend__request-text">Запрос на&nbsp;персональную тренировку</p>
          <div className="thumbnail-friend__button-wrapper">
            <Button text="Принять" className="thumbnail-friend__button" darckBg medium />
            <Button text="Отклонить" className="thumbnail-friend__button" darckBg outlined medium />
            {/* <button className="btn btn--medium btn--dark-bg thumbnail-friend__button" type="button">Принять </button>
            <button className="btn btn--medium btn--outlined btn--dark-bg thumbnail-friend__button" type="button">Отклонить </button> */}
          </div>
        </div>
      </div>
    </li>
  );
};

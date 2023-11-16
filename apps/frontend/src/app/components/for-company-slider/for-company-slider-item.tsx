import { IUser } from '@fit-friends/shared';
import React from 'react';
import { Link } from 'react-router-dom';

interface ForCompanySliderItemProps {
  user: IUser;
}

export const ForCompanySliderItem: React.FC<ForCompanySliderItemProps> = ({ user }) => {
  return (
    <div className="look-for-company__item">
      <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
        <div className="thumbnail-user__image">
          <picture>
            <source />
            <img src={user.avatar} srcSet={user.avatar} width="82" height="82" alt="" />
          </picture>
        </div>

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
        <Link className="btn btn--outlined btn--dark-bg btn--medium thumbnail-user__button" to="#">
          Подробнее
        </Link>
      </div>
    </div>
  );
};

import { IUser } from '@fit-friends/shared';
import React from 'react';
import { ButtonLink } from '../ui/button-link/button-link';
import { getUserRoute } from '../../utils/route';
import { Avatar } from '../ui/avatar/avatar';
import { getTrainingName, getUserLocation } from '../../utils/helpers';

interface ForCompanySliderItemProps {
  user: IUser;
}

export const ForCompanySliderItem: React.FC<ForCompanySliderItemProps> = ({ user }) => {
  return (
    <div className="look-for-company__item">
      <div className="thumbnail-user thumbnail-user--role-user thumbnail-user--dark">
        <Avatar src={user.avatar} width={82} height={82} className='thumbnail-user__image' />
        <div className="thumbnail-user__header">
          <h3 className="thumbnail-user__name">{user.name}</h3>
          <div className="thumbnail-user__location">
            <svg width="14" height="16" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#icon-location" />
            </svg>
            <address className="thumbnail-user__location-address">{getUserLocation(user.location).title}</address>
          </div>
        </div>
        <ul className="thumbnail-user__hashtags-list">
          {user.trainingType.map((type) => (
            <li key={type} className="thumbnail-user__hashtags-item">
              <div className="hashtag thumbnail-user__hashtag">
                <span>#{getTrainingName(type)}</span>
              </div>
            </li>
          ))}
        </ul>
        <ButtonLink text='Подробнее' to={getUserRoute(user.id)} className='thumbnail-user__button' outlined medium darckBg />
      </div>
    </div>
  );
};

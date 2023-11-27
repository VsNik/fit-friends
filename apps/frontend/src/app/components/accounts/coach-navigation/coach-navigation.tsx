import React from 'react';
import { ThumbnailLink } from '../../thumbnails/thumbnail-link/thumbnail-link';
import { RouteName } from '../../../constants/route';
import { ThumbnailBanner } from '../../thumbnails/thumbnail-banner/thumbnail-banner';

export const CoachNavigation: React.FC = () => {
  return (
    <div className="personal-account-coach__navigation">
      <ThumbnailLink text='Мои тренировки' icon='icon-flash' to={RouteName.MyTrainings} />
      <ThumbnailLink text='Создать тренировку' icon='icon-add' to={RouteName.AddTraining} />
      <ThumbnailLink text='Мои друзья' icon='icon-friends' to={RouteName.Friends} />
      <ThumbnailLink text='Мои заказы' icon='icon-bag' to={RouteName.Orders} />
      
      <div className="personal-account-coach__calendar">
        <ThumbnailBanner 
          image='/assets/img/content/thumbnails/nearest-gym-01.jpg' 
          text='Скоро тут будет интересно' 
        />
      </div>
    </div>
  );
};

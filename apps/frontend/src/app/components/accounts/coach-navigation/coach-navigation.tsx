import React from 'react';
import { ThumbnailLink } from '../../thumbnails/thumbnail-link/thumbnail-link';
import { Image } from '../../ui/image/image';
import { RouteName } from '../../../constants/route';

export const CoachNavigation: React.FC = () => {
  return (
    <div className="personal-account-coach__navigation">
      <ThumbnailLink text='Мои тренировки' icon='icon-flash' to={RouteName.MyTrainings} />
      <ThumbnailLink text='Создать тренировку' icon='icon-add' to={RouteName.AddTraining} />
      <ThumbnailLink text='Мои друзья' icon='icon-friends' to={RouteName.Friends} />
      <ThumbnailLink text='Мои заказы' icon='icon-bag' to={RouteName.Orders} />
      
      <div className="personal-account-coach__calendar">
        <div className="thumbnail-spec-gym">
          <Image src='/assets/img/content/thumbnails/nearest-gym-01.jpg' className='thumbnail-spec-gym__image' width={330} height={190} />
          <div className="thumbnail-spec-gym__header">
            <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

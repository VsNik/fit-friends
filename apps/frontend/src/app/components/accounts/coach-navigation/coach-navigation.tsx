import React from 'react';
import { ThumbnailLink } from '../../thumbnails/thumbnail-link/thumbnail-link';
import { RouteName } from '../../../constants/route';
import { ThumbnailBanner } from '../../thumbnails/thumbnail-banner/thumbnail-banner';
import { useAppSelector } from '../../../store/hooks';
import { Loader } from '../../loader/loader';
import { LoadStatus } from '../../../constants/common';
import * as userSelector from '../../../store/user/user-select';

export const CoachNavigation: React.FC = () => {
  const loadStatus = useAppSelector(userSelector.loadStatus);
  const isLoading = loadStatus === LoadStatus.Loading;

  return (
    <div className="personal-account-coach__navigation" data-testid='coach-navigation-block'>
      {isLoading && <Loader />}

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

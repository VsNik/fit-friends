import React from 'react';
import { ThumbnailLink } from '../../thumbnails/thumbnail-link/thumbnail-link';
import { RouteName } from '../../../constants/route';
import { ThumbnailBanner } from '../../thumbnails/thumbnail-banner/thumbnail-banner';

export const UserNavigation: React.FC = () => {
  return (
    <div className="personal-account-user__additional-info">
      <ThumbnailLink text="Мои друзья" icon="icon-friends" to={RouteName.Friends} />
      <ThumbnailLink text="Мои покупки" icon="icon-shopping-cart" to={RouteName.Purchases} />

      <ThumbnailBanner 
        image="/assets/img/content/thumbnails/nearest-gym-01.jpg" 
        text="Скоро тут появится что-то полезное" 
      />
    </div>
  );
};

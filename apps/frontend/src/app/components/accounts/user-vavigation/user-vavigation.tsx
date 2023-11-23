import React from 'react';
import { ThumbnailLink } from '../../thumbnails/thumbnail-link/thumbnail-link';
import { Image } from '../../ui/image/image';
import { RouteName } from '../../../constants/route';

export const UserNavigation: React.FC = () => {
  return (
    <div className="personal-account-user__additional-info">
      <ThumbnailLink text="Мои друзья" icon="icon-friends" to={RouteName.Friends} />
      <ThumbnailLink text="Мои покупки" icon="icon-shopping-cart" to="#" />
      
      <div className="thumbnail-spec-gym">
        <Image src="/assets/img/content/thumbnails/nearest-gym-01.jpg" className="thumbnail-spec-gym__image" width={330} height={190} />
        <div className="thumbnail-spec-gym__header">
          <h3 className="thumbnail-spec-gym__title">Скоро тут появится что-то полезное</h3>
        </div>
      </div>
    </div>
  );
};

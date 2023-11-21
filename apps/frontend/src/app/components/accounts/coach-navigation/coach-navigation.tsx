import React from 'react';
import { ThumbnailLink } from '../../thumbnails/thumbnail-link/thumbnail-link';

export const CoachNavigation: React.FC = () => {
  return (
    <div className="personal-account-coach__navigation">
      <ThumbnailLink text='Мои тренировки' icon='icon-flash' to='#' />
      <ThumbnailLink text='Создать тренировку' icon='icon-add' to='#' />
      <ThumbnailLink text='Мои друзья' icon='icon-friends' to='#' />
      <ThumbnailLink text='Мои заказы' icon='icon-bag' to='#' />
      
      <div className="personal-account-coach__calendar">
        <div className="thumbnail-spec-gym">
          <div className="thumbnail-spec-gym__image">
            <picture>
              <source
                type="image/webp"
                srcSet="/assets/img/content/thumbnails/nearest-gym-01.webp, /assets/img/content/thumbnails/nearest-gym-01@2x.webp 2x"
              />
              <img
                src="/assets/img/content/thumbnails/nearest-gym-01.jpg"
                srcSet="/assets/img/content/thumbnails/nearest-gym-01@2x.jpg 2x"
                width="330"
                height="190"
                alt=""
              />
            </picture>
          </div>

          <div className="thumbnail-spec-gym__header">
            <h3 className="thumbnail-spec-gym__title">Скоро тут будет интересно</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

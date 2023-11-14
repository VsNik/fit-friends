import React from 'react';

export const CoachNavigation: React.FC = () => {
  return (
    <div className="personal-account-coach__navigation">
      <a className="thumbnail-link thumbnail-link--theme-light" href="#">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-flash" />
          </svg>
        </div>
        <span className="thumbnail-link__text">Мои тренировки</span>
      </a>
      <a className="thumbnail-link thumbnail-link--theme-light" href="#">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-add" />
          </svg>
        </div>
        <span className="thumbnail-link__text">Создать тренировку</span>
      </a>
      <a className="thumbnail-link thumbnail-link--theme-light" href="#">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-friends" />
          </svg>
        </div>
        <span className="thumbnail-link__text">Мои друзья</span>
      </a>
      <a className="thumbnail-link thumbnail-link--theme-light" href="#">
        <div className="thumbnail-link__icon thumbnail-link__icon--theme-light">
          <svg width="30" height="26" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-bag" />
          </svg>
        </div>
        <span className="thumbnail-link__text">Мои заказы</span>
      </a>
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

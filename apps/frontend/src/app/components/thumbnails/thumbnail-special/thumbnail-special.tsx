import { ITraining } from '@fit-friends/shared';
import React from 'react';
import { Image } from '../../ui/image/image';

interface ThumbnailSpecialProps {
  training: ITraining;
}

export const ThumbnailSpecial: React.FC<ThumbnailSpecialProps> = ({training}) => {

  return (
    <div className="special-offers__item is-active">
      <aside className="promo-slider">
        <div className="promo-slider__overlay" />
        <Image src={training.bgImage} width={1040} height={469} className='promo-slider__image' alt='promo' dataTestid='promo-image' />
        <div className="promo-slider__header">
          <h3 className="promo-slider__title" data-testid='promo-title'>{training.title}</h3>
          <div className="promo-slider__logo">
            <svg width="74" height="74" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#logotype" />
            </svg>
          </div>
        </div>
        <span className="promo-slider__text" data-testid='promo-text'>{training.description}</span>
        <div className="promo-slider__bottom-container">
          <div className="promo-slider__slider-dots" />
          <div className="promo-slider__price-container">
            <p className="promo-slider__price" data-testid='promo-prica'>{training.price} ₽</p>
            <p className="promo-slider__sup">за занятие</p>
            <p className="promo-slider__old-price">{training.price + training.price * 0.1} ₽</p>
          </div>
        </div>
      </aside>
    </div>
  );
};

import React from 'react';

interface ThumbnailSpecialProps {
    title: string;
    src: string;
    srcSet?: string;
    price: number;
}

export const ThumbnailSpecial: React.FC<ThumbnailSpecialProps> = (props) => {
  const {title, src, srcSet, price} = props;

  return (
    <div className="special-offers__item is-active">
      <aside className="promo-slider">
        <div className="promo-slider__overlay" />
        <div className="promo-slider__image">
          <img src={src} srcSet={srcSet} width="1040" height="469" alt="promo" />
        </div>
        <div className="promo-slider__header">
          <h3 className="promo-slider__title">{title}</h3>
          <div className="promo-slider__logo">
            <svg width="74" height="74" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#logotype" />
            </svg>
          </div>
        </div>
        <span className="promo-slider__text">{title}</span>
        <div className="promo-slider__bottom-container">
          <div className="promo-slider__slider-dots" />
          <div className="promo-slider__price-container">
            <p className="promo-slider__price">{price} ₽</p>
            <p className="promo-slider__sup">за занятие</p>
            <p className="promo-slider__old-price">{price + price * 0.1} ₽</p>
          </div>
        </div>
      </aside>
    </div>
  );
};

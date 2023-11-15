import { ITraining } from '@fit-friends/shared';
import React from 'react';
import { Link } from 'react-router-dom';

interface PopularSliderItemProps {
  training: ITraining;
}

export const PopularSliderItem: React.FC<PopularSliderItemProps> = ({training}) => {
  return (
    <div className="popular-trainings__item">
      <div className="thumbnail-training">
        <div className="thumbnail-training__inner">
          <div className="thumbnail-training__image">
            <picture>
              <source/>
              <img
                src={training.bgImage}
                width="330"
                height="190"
                alt=""
              />
            </picture>
          </div>
          <p className="thumbnail-training__price">
            <span className="thumbnail-training__price-value">{training.price}</span>
            <span>₽</span>
          </p>
          <h3 className="thumbnail-training__title">{training.title}</h3>
          <div className="thumbnail-training__info">
            <ul className="thumbnail-training__hashtags-list">
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#{training.type}</span>
                </div>
              </li>
              <li className="thumbnail-training__hashtags-item">
                <div className="hashtag thumbnail-training__hashtag">
                  <span>#{training.calories}кал</span>
                </div>
              </li>
            </ul>
            <div className="thumbnail-training__rate">
              <svg width="16" height="16" aria-hidden="true">
                <use xlinkHref="/assets/img/sprite.svg#icon-star" />
              </svg>
              <span className="thumbnail-training__rate-value">5</span>
            </div>
          </div>
          <div className="thumbnail-training__text-wrapper">
            <p className="thumbnail-training__text">
              {training.description}
            </p>
          </div>
          <div className="thumbnail-training__button-wrapper">
            <Link className="btn btn--small thumbnail-training__button-catalog" to="#">
              Подробнее
            </Link>
            <Link className="btn btn--small btn--outlined thumbnail-training__button-catalog" to="#">
              Отзывы
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

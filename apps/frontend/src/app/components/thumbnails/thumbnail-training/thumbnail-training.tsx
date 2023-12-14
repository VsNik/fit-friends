import React from 'react';
import { ITraining } from '@fit-friends/shared';
import { Hashtag } from '../../ui/hashtag/hashtag';
import { ButtonLink } from '../../ui/button-link/button-link';
import { getTrainingRoute } from '../../../utils/route';
import { Image } from '../../ui/image/image';
import { ThumbnailTotalInfo } from '../thumbnail-total-info/thumbnail-total-info';
import { getPriceView, getTrainingName } from '../../../utils/helpers';

interface ThumbnailTrainingProps {
  training: ITraining;
  statistic?: boolean;
}

export const ThumbnailTraining: React.FC<ThumbnailTrainingProps> = (props) => {
  const { training, statistic } = props;
  
  return (
    <div className="thumbnail-training" >
      <div className="thumbnail-training__inner" data-testid='thumbnail-training'>
        <Image src={training.bgImage} className='thumbnail-training__image' width={330} height={190} dataTestid='training-image' />
        <p className="thumbnail-training__price" data-testid='thubnail-training-price'>{getPriceView(training.price)}</p>
        <h3 className="thumbnail-training__title" data-testid='thumbnail-training-title'>{training.title}</h3>
        <div className="thumbnail-training__info">
          <ul className="thumbnail-training__hashtags-list">
            <li className="thumbnail-training__hashtags-item">
              <Hashtag title={getTrainingName(training.type)} className="thumbnail-training__hashtag" dataTestId='thumbnail-training-type' />
            </li>
            <li className="thumbnail-training__hashtags-item">
              <Hashtag title={`${training.calories} кал`} className="thumbnail-training__hashtag" dataTestId='thumbnail-training-calory' />
            </li>
          </ul>
          <div className="thumbnail-training__rate">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#icon-star" />
            </svg>
            <span className="thumbnail-training__rate-value" data-testid='thumbnail-training-rating'>{training.rating}</span>
          </div>
        </div>
        <div className="thumbnail-training__text-wrapper">
          <p className="thumbnail-training__text" data-testid='yhumbnail-training-desc'>{training.description}</p>
        </div>
        <div className="thumbnail-training__button-wrapper">
          <ButtonLink text="Подробнее" to={getTrainingRoute(training.id)} small />
          <ButtonLink text="Отзывы" to="#" small outlined />
        </div>
      </div>

      {statistic && 
        <ThumbnailTotalInfo count={training.ordersCount} summ={training.ordersSumm} />
      }
    </div>
  );
};

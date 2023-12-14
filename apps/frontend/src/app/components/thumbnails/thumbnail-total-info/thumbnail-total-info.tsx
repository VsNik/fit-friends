import React from 'react';

interface ThumbnailTotalInfoProps {
  count?: number;
  summ?: number;
}

export const ThumbnailTotalInfo: React.FC<ThumbnailTotalInfoProps> = (props) => {
  const { count, summ } = props;

  return (
    <div className="thumbnail-training__total-info" data-testid='thumbnail-training-info'>
      <div className="thumbnail-training__total-info-card">
        <svg width="32" height="32" aria-hidden="true">
          <use xlinkHref="/assets/img/sprite.svg#icon-chart" />
        </svg>
        <p className="thumbnail-training__total-info-value" data-testid='training-orders'>{count}</p>
        <p className="thumbnail-training__total-info-text">Куплено тренировок</p>
      </div>
      <div className="thumbnail-training__total-info-card">
        <svg width="31" height="28" aria-hidden="true">
          <use xlinkHref="/assets/img/sprite.svg#icon-wallet" />
        </svg>
        <p className="thumbnail-training__total-info-value" data-testid='training-total-summ'>
          {summ}
          <span>₽</span>
        </p>
        <p className="thumbnail-training__total-info-text">Общая сумма</p>
      </div>
    </div>
  );
};

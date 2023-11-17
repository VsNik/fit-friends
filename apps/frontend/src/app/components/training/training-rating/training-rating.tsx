import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TrainingRatingProps {
  value: number;
}

export const TrainingRating: React.FC<TrainingRatingProps> = ({ value }) => {
  const { register } = useFormContext();

  return (
    <div className="training-info__input training-info__input--rating">
      <label>
        <span className="training-info__label">Рейтинг</span>
        <span className="training-info__rating-icon">
          <svg width="18" height="18" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-star" />
          </svg>
        </span>
        <input {...register('rating')} type="number" name="rating" value={value} />
      </label>
    </div>
  );
};

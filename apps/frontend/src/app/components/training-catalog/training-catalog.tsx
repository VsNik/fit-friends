import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { ButtonShowMore } from '../ui/button-show-more/button-show-more';
import { ThumbnailTraining } from '../thumbnails/thumbnail-training/thumbnail-training';

export const TrainingCatalog: React.FC = () => {
  const trainings = useAppSelector(state => state.trainings.trainings);

  return (
    <div className="training-catalog">
      <ul className="training-catalog__list">
        {trainings?.map((training) => (
          <li key={training.id} className="training-catalog__item">
            <ThumbnailTraining training={training} />
          </li>
        ))}
      </ul>

      <ButtonShowMore className='training-catalog__show-more' />
    </div>
  );
};

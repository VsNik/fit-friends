import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { ButtonShowMore } from '../ui/button-show-more/button-show-more';
import { ThumbnailTraining } from '../thumbnails/thumbnail-training/thumbnail-training';
import * as trainingsSelector from '../../store/trainings/trainings-select';
import { Loader } from '../loader/loader';

export const TrainingCatalog: React.FC = () => {
  const trainings = useAppSelector(trainingsSelector.trainings);
  const isLoading = useAppSelector(trainingsSelector.isLoading);

  if (isLoading) {
    return <Loader />
  }

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

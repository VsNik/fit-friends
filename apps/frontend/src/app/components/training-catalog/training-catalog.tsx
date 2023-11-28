import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { ButtonShowMore } from '../ui/button-show-more/button-show-more';
import { ThumbnailTraining } from '../thumbnails/thumbnail-training/thumbnail-training';
import { Loader } from '../loader/loader';
import { LoadStatus } from '../../constants/common';
import * as trainingsSelector from '../../store/trainings/trainings-select';

export const TrainingCatalog: React.FC = () => {
  const trainings = useAppSelector(trainingsSelector.trainings);
  const loadStatus = useAppSelector(trainingsSelector.loadStatus);
  const isLoading = loadStatus === LoadStatus.Loading;

  return (
    <div className="training-catalog">
      {isLoading && <Loader />}
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

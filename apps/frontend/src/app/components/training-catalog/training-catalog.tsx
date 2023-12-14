import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { ButtonShowMore } from '../ui/button-show-more/button-show-more';
import { ThumbnailTraining } from '../thumbnails/thumbnail-training/thumbnail-training';
import { Loader } from '../loader/loader';
import { CardsOnPage, LoadStatus } from '../../constants/common';
import * as trainingsSelector from '../../store/trainings/trainings-select';

interface TrainingCatalogProps {
  page: number;
  onShowMore: () => void;
}

export const TrainingCatalog: React.FC<TrainingCatalogProps> = ({page, onShowMore}) => {
  const trainings = useAppSelector(trainingsSelector.trainings);
  const total = useAppSelector(trainingsSelector.total);
  const loadStatus = useAppSelector(trainingsSelector.loadStatus);

  const isLoading = loadStatus === LoadStatus.Loading;  
  const pages = Math.ceil(total / CardsOnPage.Trainings);

  return (
    <div className="training-catalog" data-testid='training-catalog'>
      {isLoading && <Loader />}
      <ul className="training-catalog__list">
        {trainings?.map((training) => (
          <li key={training.id} className="training-catalog__item">
            <ThumbnailTraining training={training} />
          </li>
        ))}
      </ul>

      {page < pages &&
        <ButtonShowMore className='training-catalog__show-more' dataTestId='show-more-button' onClick={onShowMore} />
      }      
    </div>
  );
};

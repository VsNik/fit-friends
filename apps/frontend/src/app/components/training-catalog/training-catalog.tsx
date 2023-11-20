import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchTrainingsAction } from '../../store/trainings/async-actions';
import { ButtonShowMore } from '../ui/button-show-more/button-show-more';
import { ThumbnailTraining } from '../thumbnails/thumbnail-training/thumbnail-training';

export const TrainingCatalog: React.FC = () => {
  const dispatch = useAppDispatch();
  const trainings = useAppSelector(state => state.trainings.trainings);

  useEffect(() => {
    dispatch(fetchTrainingsAction());
  }, [dispatch]);

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

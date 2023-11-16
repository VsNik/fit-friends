import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ThumbnailTraining } from '../thumbnail-training/thumbnail-training';
import { fetchTrainingsAction } from '../../store/trainings/async-actions';

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

      <div className="show-more training-catalog__show-more">
        <button className="btn show-more__button show-more__button--more" type="button">
          Показать еще
        </button>
        <button className="btn show-more__button show-more__button--to-top" type="button">
          Вернуться в начало
        </button>
      </div>
    </div>
  );
};

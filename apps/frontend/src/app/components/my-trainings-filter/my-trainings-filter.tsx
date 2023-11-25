import React, { ChangeEvent } from 'react';
import { RangePrice } from '../ui/range-price/range-price';
import { RangeCalory } from '../ui/range-calory/range-calory';
import { RangeRating } from '../ui/range-rating/range-rating';
import { CheckDuration } from '../ui/check-duration/check-duration';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import * as trainingsSelector from '../../store/trainings/trainings-select';
import { setCaloriesAction, setDurationAction, setPriceAction, setRatingAction } from '../../store/trainings/trainings-slice';

enum Price {
  Min = 0,
  Max = 10000,
  Step = 100,
}

enum Calory {
  Min = 1000,
  Max = 5000,
  Step = 100,
}

enum Rating {
  Min = 1,
  Max = 5,
}

export const MyTrainingsFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(trainingsSelector.filter);
  const isLoading = useAppSelector(trainingsSelector.isLoading);

  const onChangedPrice = (values: number[]) => {
    dispatch(setPriceAction(values));
  };

  const onChangeCalory = (values: number[]) => {
    dispatch(setCaloriesAction(values));
  };

  const onChangeRating = (values: number[]) => {
    dispatch(setRatingAction(values));
  };

  const onChangeDuration = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(setDurationAction(evt.target.value));
  };

  return (
    <form className="my-training-form__form">
      <RangePrice onChangedPrice={onChangedPrice} min={Price.Min} max={Price.Max} step={Price.Step} disabled={isLoading} />
      <RangeCalory onChangedCalory={onChangeCalory} min={Calory.Min} max={Calory.Max} step={Calory.Step} disabled={isLoading} />
      <RangeRating onChangedRating={onChangeRating} min={Rating.Min} max={Rating.Max} disabled={isLoading} />

      <div className="my-training-form__block my-training-form__block--duration">
        <h4 className="my-training-form__block-title">Длительность</h4>
        <CheckDuration name="trainingDuration" durations={filter.durations} onChange={onChangeDuration} disabled={isLoading} />
      </div>
    </form>
  );
};

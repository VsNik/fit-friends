import React, { ChangeEvent } from 'react';
import { RangePrice } from '../ui/range-price/range-price';
import { RangeCalory } from '../ui/range-calory/range-calory';
import { RangeRating } from '../ui/range-rating/range-rating';
import { CheckDuration } from '../ui/check-duration/check-duration';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCaloriesAction, setDurationAction, setPriceAction, setRatingAction } from '../../store/trainings/trainings-slice';
import { CaloryRange, PriceRange, RatingRange } from '../../constants/common';
import * as trainingsSelector from '../../store/trainings/trainings-select';

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
      <RangePrice onChangedPrice={onChangedPrice} min={PriceRange.Min} max={PriceRange.Max} step={PriceRange.Step} disabled={isLoading} />
      <RangeCalory onChangedCalory={onChangeCalory} min={CaloryRange.Min} max={CaloryRange.Max} step={CaloryRange.Step} disabled={isLoading} />
      <RangeRating onChangedRating={onChangeRating} min={RatingRange.Min} max={RatingRange.Max} disabled={isLoading} />

      <div className="my-training-form__block my-training-form__block--duration">
        <h4 className="my-training-form__block-title">Длительность</h4>
        <CheckDuration name="trainingDuration" durations={filter.durations} onChange={onChangeDuration} disabled={isLoading} />
      </div>
    </form>
  );
};

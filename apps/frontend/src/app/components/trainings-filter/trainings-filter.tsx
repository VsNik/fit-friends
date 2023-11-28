import React, { ChangeEvent } from 'react';
import { RangePrice } from '../ui/range-price/range-price';
import { RangeCalory } from '../ui/range-calory/range-calory';
import { RangeRating } from '../ui/range-rating/range-rating';
import { ButtonsSortingPrice } from '../ui/buttons-sorting-price/buttons-sorting-price';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCaloriesAction, setDirectionAction, setPriceAction, setRatingAction, setTypeAction } from '../../store/trainings/trainings-slice';
import { CheckTypes } from '../ui/check-types/check-types';
import { LoadStatus, RatingRange } from '../../constants/common';
import * as trainingsSelector from '../../store/trainings/trainings-select';

export const TrainingsFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(trainingsSelector.filter);
  const sorting = useAppSelector(trainingsSelector.direction);
  const loadStatus = useAppSelector(trainingsSelector.loadStatus);
  const trainings = useAppSelector(trainingsSelector.trainings);
  const isLoading = loadStatus === LoadStatus.Loading;

  const onChangedPrice = (values: number[]) => dispatch(setPriceAction(values));
  const onChangeCalory = (values: number[]) => dispatch(setCaloriesAction(values));
  const onChangeRating = (values: number[]) => dispatch(setRatingAction(values));
  const handleChangeTypes = (evt: ChangeEvent<HTMLInputElement>) => dispatch(setTypeAction(evt.target.value));
  const handleChangeSorting = (evt: ChangeEvent<HTMLInputElement>) => dispatch(setDirectionAction(evt.target.value));

  return (
    <form className="gym-catalog-form__form">
      <RangePrice trainings={trainings} onChangedPrice={onChangedPrice} disabled={isLoading} />
      <RangeCalory trainings={trainings} onChangedCalory={onChangeCalory} disabled={isLoading} />
      <RangeRating onChangedRating={onChangeRating} min={RatingRange.Min} max={RatingRange.Max} disabled={isLoading} />

      <div className="gym-catalog-form__block gym-catalog-form__block--type">
        <h4 className="gym-catalog-form__block-title">Тип</h4>
        <CheckTypes types={filter.types} name="trainingType" className="gym-catalog-form__check-list" onChange={handleChangeTypes} />
      </div>

      <div className="gym-catalog-form__block gym-catalog-form__block--sort">
        <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
        <ButtonsSortingPrice sorting={sorting} onChecked={handleChangeSorting} disabled={isLoading} />
      </div>
    </form>
  );
};

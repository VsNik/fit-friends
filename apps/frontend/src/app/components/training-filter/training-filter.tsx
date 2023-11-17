import React from 'react';
import { RangePrice } from '../ui/range-price/range-price';
import { RangeCalory } from '../ui/range-calory/range-calory';
import { RangeRating } from '../ui/range-rating/range-rating';
import { CheckTypes } from '../ui/check-types/check-types';
import { CheckSortingPrice } from '../ui/check-sorting-price/check-sorting-price';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCaloriesAction, setPriceAction, setRatingAction } from '../../store/trainings/trainings-slice';

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

export const TrainingFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const types = useAppSelector(state => state.trainings.type);
  const isLoading = useAppSelector(state => state.trainings.isLoading);

  const onChangedPrice = (values: number[]) => 
    dispatch(setPriceAction(values));

  const onChangeCalory = (values: number[]) => 
    dispatch(setCaloriesAction(values));

  const onChangeRating = (values: number[]) => 
    dispatch(setRatingAction(values));

  return (
    <div className="gym-catalog-form">
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className="gym-catalog-form__wrapper">
        <button className="btn-flat btn-flat--underlined gym-catalog-form__btnback" type="button">
          <svg width="14" height="10" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#arrow-left" />
          </svg>
          <span>Назад</span>
        </button>
        <h3 className="gym-catalog-form__title">Фильтры</h3>
        <form className="gym-catalog-form__form">

          <RangePrice 
            onChangedPrice={onChangedPrice} 
            min={Price.Min} 
            max={Price.Max} 
            step={Price.Step} disabled={isLoading}
          />

          <RangeCalory 
            onChangedCalory={onChangeCalory}
            min={Calory.Min}
            max={Calory.Max}
            step={Calory.Step} disabled={isLoading}
          />

          <RangeRating 
            onChangedRating={onChangeRating} 
            min={Rating.Min} 
            max={Rating.Max} disabled={isLoading} 
          />

          <CheckTypes typeList={types} name='trainingType' disabled={isLoading}/>

          <CheckSortingPrice name='sorting' onChecked={() => {}} disabled={isLoading} />
        </form>
      </div>
    </div>
  );
};

import React, { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { RangePrice } from '../ui/range-price/range-price';
import { RangeCalory } from '../ui/range-calory/range-calory';
import { RangeRating } from '../ui/range-rating/range-rating';
import { ButtonsSortingPrice } from '../ui/buttons-sorting-price/buttons-sorting-price';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCaloriesAction, setDirectionAction, setPriceAction, setRatingAction, setTypeAction } from '../../store/trainings/trainings-slice';
import { ButtonFloat } from '../ui/button-float/button-float';
import { CheckTypes } from '../ui/check-types/check-types';
import * as trainingsSelector from '../../store/trainings/trainings-select';
import { RouteName } from '../../constants/route';

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

export const TrainingsFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const filter = useAppSelector(trainingsSelector.filter);
  const sorting = useAppSelector(trainingsSelector.direction);
  const isLoading = useAppSelector(trainingsSelector.isLoading);

  const onChangedPrice = (values: number[]) => dispatch(setPriceAction(values));

  const onChangeCalory = (values: number[]) => dispatch(setCaloriesAction(values));

  const onChangeRating = (values: number[]) => dispatch(setRatingAction(values));

  const handleChangeTypes = (evt: ChangeEvent<HTMLInputElement>) => dispatch(setTypeAction(evt.target.value));

  const handleChangeSorting = (evt: ChangeEvent<HTMLInputElement>) => dispatch(setDirectionAction(evt.target.value));

  return (
    <div className="gym-catalog-form">
      <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
      <div className="gym-catalog-form__wrapper">
        <ButtonFloat text="Назад" icon="arrow-left" onClick={() => navigation(RouteName.Home)} className="gym-catalog-form__btnback" underline />

        <h3 className="gym-catalog-form__title">Фильтры</h3>
        <form className="gym-catalog-form__form">
          <RangePrice onChangedPrice={onChangedPrice} min={Price.Min} max={Price.Max} step={Price.Step} disabled={isLoading} />
          <RangeCalory onChangedCalory={onChangeCalory} min={Calory.Min} max={Calory.Max} step={Calory.Step} disabled={isLoading} />
          <RangeRating onChangedRating={onChangeRating} min={Rating.Min} max={Rating.Max} disabled={isLoading} />

          <div className="gym-catalog-form__block gym-catalog-form__block--type">
            <h4 className="gym-catalog-form__block-title">Тип</h4>
            <CheckTypes types={filter.types} name="trainingType" className="gym-catalog-form__check-list" onChange={handleChangeTypes} />
          </div>

          <div className="gym-catalog-form__block gym-catalog-form__block--sort">
            <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
            <ButtonsSortingPrice sorting={sorting} onChecked={handleChangeSorting} disabled={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
};

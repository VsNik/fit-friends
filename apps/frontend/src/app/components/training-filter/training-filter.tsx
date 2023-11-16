import React from 'react';
import { RangePrice } from '../ui/range-price/range-price';
import { RangeCalory } from '../ui/range-calory/range-calory';
import { RangeRating } from '../ui/range-rating/range-rating';
import { CheckTypes } from '../ui/check-types/check-types';
import { CheckSortingPrice } from '../ui/check-sorting-price/check-sorting-price';

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

  const onChangedPrice = (values: number[]) => {
    console.log(values);
  }

  const onChangeCalory = (values: number[]) => {
    console.log(values);
  }

  const onChangeRating = (values: number[]) => {
    console.log(values);
  }  

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
            step={Price.Step}
          />

          <RangeCalory 
            onChangedCalory={onChangeCalory}
            min={Calory.Min}
            max={Calory.Max}
            step={Calory.Step}
          />

          <RangeRating 
            onChangedRating={onChangeRating} 
            min={Rating.Min} 
            max={Rating.Max} 
          />

          <CheckTypes name='trainingType' />

          <CheckSortingPrice />
        </form>
      </div>
    </div>
  );
};

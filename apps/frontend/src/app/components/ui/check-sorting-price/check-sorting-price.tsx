import React from 'react';

export const CheckSortingPrice: React.FC = () => {
  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--sort">
      <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
      <div className="btn-radio-sort gym-catalog-form__radio">
        <label>
          <input type="radio" name="sort" />
          <span className="btn-radio-sort__label">Дешевле</span>
        </label>
        <label>
          <input type="radio" name="sort" />
          <span className="btn-radio-sort__label">Дороже</span>
        </label>
        <label>
          <input type="radio" name="sort" />
          <span className="btn-radio-sort__label">Бесплатные</span>
        </label>
      </div>
    </div>
  );
};

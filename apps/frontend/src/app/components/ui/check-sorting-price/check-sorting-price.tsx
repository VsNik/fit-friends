import React from 'react';
import { SortDirection } from '@fit-friends/shared';

interface CheckSortingPriceProps {
  name: string;
  onChecked: (value: string) => void;
  disabled?: boolean;
}

export const CheckSortingPrice: React.FC<CheckSortingPriceProps> = ({name, disabled, onChecked}) => {
  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--sort">
      <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
      <div className="btn-radio-sort gym-catalog-form__radio">
        <label>
          <input type="radio" name={name} value={SortDirection.Asc} onChange={(evt) => onChecked(evt.target.value)} defaultChecked disabled={disabled} />
          <span className="btn-radio-sort__label">Дешевле</span>
        </label>
        <label>
          <input type="radio" name={name} value={SortDirection.Desc} onChange={(evt) => onChecked(evt.target.value)} disabled={disabled} />
          <span className="btn-radio-sort__label">Дороже</span>
        </label>
        <label>
          <input type="radio" name={name} value='0' onChange={(evt) => onChecked(evt.target.value)} disabled={disabled} />
          <span className="btn-radio-sort__label">Бесплатные</span>
        </label>
      </div>
    </div>
  );
};

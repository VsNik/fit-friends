import React, { ChangeEvent } from 'react';
import { SortDirection } from '@fit-friends/shared';

interface CheckSortingPriceProps {
  sorting: SortDirection | 'free' | null | undefined;
  onChecked: (evt: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const CheckSortingPrice: React.FC<CheckSortingPriceProps> = (props) => {
  const {sorting, disabled, onChecked} = props;
  return (
    // <div className="gym-catalog-form__block gym-catalog-form__block--sort">
    //   <h4 className="gym-catalog-form__title gym-catalog-form__title--sort">Сортировка</h4>
      <div className="btn-radio-sort gym-catalog-form__radio">
        <label>
          <input type="radio" name='sorting' value={SortDirection.Asc} checked={sorting === SortDirection.Asc} onChange={onChecked} defaultChecked disabled={disabled} />
          <span className="btn-radio-sort__label">Дешевле</span>
        </label>
        <label>
          <input type="radio" name='sorting' value={SortDirection.Desc} checked={sorting === SortDirection.Desc} onChange={onChecked} disabled={disabled} />
          <span className="btn-radio-sort__label">Дороже</span>
        </label>
        <label>
          <input type="radio" name='sorting' value='free' checked={sorting === 'free'} onChange={onChecked} disabled={disabled} />
          <span className="btn-radio-sort__label">Бесплатные</span>
        </label>
      </div>
    // </div>
  );
};

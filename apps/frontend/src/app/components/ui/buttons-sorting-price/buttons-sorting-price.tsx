import React, { ChangeEvent } from 'react';
import { TrainingSortDirection, SortDirection } from '@fit-friends/shared';

interface ButtonsSortingPriceProps {
  sorting: TrainingSortDirection;
  onChecked: (evt: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  dataTestId?: string;
}

export const ButtonsSortingPrice: React.FC<ButtonsSortingPriceProps> = (props) => {
  const { sorting, disabled, onChecked, dataTestId } = props;
  return (
    <div className="btn-radio-sort gym-catalog-form__radio">
      <label>
        <input
          type="radio"
          name="sorting"
          value={SortDirection.Asc}
          checked={sorting === TrainingSortDirection.Asc}
          onChange={onChecked}
          disabled={disabled}
          data-testid={dataTestId}
        />
        <span className="btn-radio-sort__label">Дешевле</span>
      </label>
      <label>
        <input
          type="radio"
          name="sorting"
          value={SortDirection.Desc}
          checked={sorting === TrainingSortDirection.Desc}
          onChange={onChecked}
          disabled={disabled}
          data-testid={dataTestId}
        />
        <span className="btn-radio-sort__label">Дороже</span>
      </label>
      <label>
        <input 
          type="radio" 
          name="sorting" 
          value="free" 
          checked={sorting === TrainingSortDirection.Free} 
          onChange={onChecked} 
          disabled={disabled}
          data-testid={dataTestId}
        />
        <span className="btn-radio-sort__label">Бесплатные</span>
      </label>
    </div>
  );
};

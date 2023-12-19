import React, { ChangeEvent } from 'react';
import { ButtonIcon } from '../button-icon/button-icon';

interface CheckCountProps {
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  onIncriment: () => void;
  onDecriment: () => void;
  count: number;
  maxCount: number;
  disabled?: boolean;
}

export const CheckCount: React.FC<CheckCountProps> = (props) => {
  const { onChange, onIncriment, onDecriment, count, maxCount, disabled } = props;

  return (
    <div className="popup__product-quantity">
      <p className="popup__quantity">Количество</p>
      <div className="input-quantity">
        <ButtonIcon 
          icon="icon-minus" 
          className="btn-icon--quantity" 
          onClick={onDecriment} 
          disabled={count === 0 || disabled}
          dataTestId='check-count-decrement'
        />

        <div className="input-quantity__input">
          <label>
            <input type="text" name="count" value={count} size={2} onChange={onChange} data-testid='check-count-input' />
          </label>
        </div>
        
        <ButtonIcon 
          icon="icon-plus" 
          className="btn-icon--quantity" 
          onClick={onIncriment} 
          disabled={count >= maxCount || disabled}
          dataTestId='check-count-increment'
        />
      </div>
    </div>
  );
};

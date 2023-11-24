import React, { ChangeEvent } from 'react';

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
        <button 
          className="btn-icon btn-icon--quantity" 
          type="button" 
          aria-label="minus" 
          onClick={onDecriment} 
          disabled={count === 0 || disabled}
        >
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-minus" />
          </svg>
        </button>
        <div className="input-quantity__input">
          <label>
            <input type="text" name="count" value={count} size={2} onChange={onChange} />
          </label>
        </div>
        <button
          className="btn-icon btn-icon--quantity"
          type="button"
          aria-label="plus"
          onClick={onIncriment}
          disabled={count >= maxCount || disabled}
        >
          <svg width="12" height="12" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-plus" />
          </svg>
        </button>
      </div>
    </div>
  );
};

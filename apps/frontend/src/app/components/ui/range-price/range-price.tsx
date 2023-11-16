import React, { useState } from 'react';
import { RangeSlider } from '../form/range-slider/range-slider';

interface PangePriceProps {
  onChangedPrice: (values: number[]) => void;
  min: number;
  max: number;
  step: number;
}

export const RangePrice: React.FC<PangePriceProps> = (props) => {
  const { min, max, step, onChangedPrice } = props;
  const [priceValue, setPriceValue] = useState([min, max]);

  const handleChanged = () => onChangedPrice(priceValue);

  const handleChangePrice = (newValues: number[]) => setPriceValue(newValues);

  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--price">
      <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
      <div className="filter-price">
        <div className="filter-price__input-text filter-price__input-text--min">
          <input type="number" id="text-min" name="text-min" value={priceValue[0]} readOnly />
          <label htmlFor="text-min">от</label>
        </div>
        <div className="filter-price__input-text filter-price__input-text--max">
          <input type="number" id="text-max" name="text-max" value={priceValue[1]} readOnly />
          <label htmlFor="text-max">до</label>
        </div>
      </div>

      <RangeSlider 
        value={priceValue} 
        onChange={handleChangePrice} 
        onChanged={handleChanged} 
        min={min} 
        max={max} 
        step={step} 
      />
    </div>
  );
};

import React, { useState } from 'react';
import { RangeSlider } from '../form/range-slider/range-slider';

interface RangeCaloryProps {
    onChangedCalory: (values: number[]) => void;
    min: number;
    max: number;
    step?: number;
}

export const RangeCalory: React.FC<RangeCaloryProps> = (props) => {
    const { min, max, step = 1, onChangedCalory } = props;
    const [caloryValue, setCaloryValue] = useState([min, max]);

    const handleChanged = () => onChangedCalory(caloryValue);

    const handleChange = (newValues: number[]) => setCaloryValue(newValues);

  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--calories">
      <h4 className="gym-catalog-form__block-title">Калории</h4>
      <div className="filter-calories">
        <div className="filter-calories__input-text filter-calories__input-text--min">
          <input type="number" id="text-min-cal" name="text-min-cal" value={caloryValue[0]} readOnly />
          <label htmlFor="text-min-cal">от</label>
        </div>
        <div className="filter-calories__input-text filter-calories__input-text--max">
          <input type="number" id="text-max-cal" name="text-max-cal" value={caloryValue[1]} readOnly />
          <label htmlFor="text-max-cal">до</label>
        </div>
      </div>

      <RangeSlider 
        value={caloryValue} 
        onChange={handleChange} 
        onChanged={handleChanged} 
        min={min} 
        max={max} 
        step={step} 
      />
    </div>
  );
};

import React, { useState } from 'react';
import { RangeSlider } from '../form/range-slider/range-slider';

interface RangeRatingProps {
  onChangedRating: (values: number[]) => void;
  min: number;
  max: number;
}

export const RangeRating: React.FC<RangeRatingProps> = (props) => {
  const { onChangedRating, min, max } = props;
  const [ratingValue, setRatingValue] = useState([min, max]);

  const handleChanged = () => onChangedRating(ratingValue);

  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--rating">
      <h4 className="gym-catalog-form__block-title">Рейтинг</h4>

      <RangeSlider 
        value={ratingValue} 
        onChange={setRatingValue} 
        onChanged={handleChanged} 
        min={min} 
        max={max} 
        step={1} 
      />
    </div>
  );
};

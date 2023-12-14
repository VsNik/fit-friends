import React from 'react';
import ReactSlider from 'react-slider';
import './range-slider.css';

interface RangeSliderProps {
  value?: number[];
  onChange?: (values: number[]) => void;
  onChanged?: () => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  dataTestId?: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = (props) => {
  const { value, onChange, onChanged, min, max, step, disabled, dataTestId } = props;

  return (
    <ReactSlider
      value={value}
      onChange={onChange}
      className="filter-ranger"
      thumbClassName="filter-ranger__toggle"
      trackClassName="filter-ranger__scale"
      onAfterChange={onChanged}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      data-testid={dataTestId}
    />
  );
};

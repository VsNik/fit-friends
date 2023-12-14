import React, { ChangeEvent, useEffect, useState } from 'react';
import { ITraining } from '@fit-friends/shared';
import { RangeSlider } from '../form/range-slider/range-slider';
import { isNotEmptyObject, toNumberInputTextValue } from '../../../utils/helpers';
import { PriceRange } from '../../../constants/common';

interface PangePriceProps {
  onChangedPrice: (values: number[]) => void;
  trainings: ITraining[];
  disabled?: boolean;  
}

export const RangePrice: React.FC<PangePriceProps> = (props) => {
  const { onChangedPrice, trainings, disabled } = props;
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [priceValue, setPriceValue] = useState<number[]>([]);

  useEffect(() => {
    if (isNotEmptyObject(trainings) && !isMounted) {
      const prices = trainings.map((item) => item.price);
      setPriceValue([
        Math.min(...prices),
        Math.max(...prices)
      ]);
      setIsMounted(true);
    }
  }, [trainings, isMounted]);

  const handleChanged = () => {
    onChangedPrice(priceValue)
  };

  const handleChangePrice = (newValues: number[]) => setPriceValue(newValues);

  const handleChangeMin = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = toNumberInputTextValue(evt.target.value);
    setPriceValue([
      value > priceValue[1] ? priceValue[1] : value, 
      priceValue[1]
    ])
  }

  const handleChangeMax = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = toNumberInputTextValue(evt.target.value);
    setPriceValue([
      priceValue[0],
      value < priceValue[0] ? priceValue[0] : value, 
    ])
  }

  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--price" data-testid='price-range-slider'>
      <h4 className="gym-catalog-form__block-title">Цена, ₽</h4>
      <div className="filter-price">
        <div className="filter-price__input-text filter-price__input-text--min">
          <input type="text" id="text-min" name="text-min" value={priceValue[0] ?? []} onChange={handleChangeMin} disabled={disabled} data-testid='input-min-element' />
          <label htmlFor="text-min">от</label>
        </div>
        <div className="filter-price__input-text filter-price__input-text--max">
          <input type="text" id="text-max" name="text-max" value={priceValue[1] ?? []} onChange={handleChangeMax} disabled={disabled} data-testid='input-max-element'  />
          <label htmlFor="text-max">до</label>
        </div>
      </div>

      <RangeSlider 
        value={priceValue} 
        onChange={handleChangePrice} 
        onChanged={handleChanged} 
        min={PriceRange.Min} 
        max={PriceRange.Max} 
        step={PriceRange.Step}
        disabled={disabled}
        dataTestId='gange-slider'
      />
    </div>
  );
};

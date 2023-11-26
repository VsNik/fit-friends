import React, { ChangeEvent, useEffect, useState } from 'react';
import { RangeSlider } from '../form/range-slider/range-slider';
import { CaloryRange } from '../../../constants/common';
import { ITraining } from '@fit-friends/shared';
import { isNotEmptyObject, toNumberInputTextValue } from '../../../utils/helpers';

interface RangeCaloryProps {
    onChangedCalory: (values: number[]) => void;
    trainings: ITraining[];
    disabled?: boolean;
}

export const RangeCalory: React.FC<RangeCaloryProps> = (props) => {
    const { onChangedCalory, trainings, disabled } = props;
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [caloryValue, setCaloryValue] = useState<number[]>([]);

    useEffect(() => {
      if (isNotEmptyObject(trainings) && !isMounted) {
        setCaloryValue([
          Math.min(...trainings.map((item) => item.calories)),
          Math.max(...trainings.map((item) => item.calories))
        ]);
        setIsMounted(true)
      }
    }, [trainings, isMounted]);

    const handleChangeMin = (evt: ChangeEvent<HTMLInputElement>) => {
      const value = toNumberInputTextValue(evt.target.value);
      setCaloryValue([
        value > caloryValue[1] ? caloryValue[1] : value, 
        caloryValue[1]
      ])
    }
  
    const handleChangeMax = (evt: ChangeEvent<HTMLInputElement>) => {
      const value = toNumberInputTextValue(evt.target.value);
      setCaloryValue([
        caloryValue[0],
        value < caloryValue[0] ? caloryValue[0] : value, 
      ])
    }

    const handleChanged = () => onChangedCalory(caloryValue);
    const handleChange = (newValues: number[]) => setCaloryValue(newValues);

  return (
    <div className="gym-catalog-form__block gym-catalog-form__block--calories">
      <h4 className="gym-catalog-form__block-title">Калории</h4>
      <div className="filter-calories">
        <div className="filter-calories__input-text filter-calories__input-text--min">
          <input type="text" id="text-min-cal" name="text-min-cal" value={caloryValue[0] ?? []} onChange={handleChangeMin} disabled={disabled}/>
          <label htmlFor="text-min-cal">от</label>
        </div>
        <div className="filter-calories__input-text filter-calories__input-text--max">
          <input type="text" id="text-max-cal" name="text-max-cal" value={caloryValue[1] ?? []} onChange={handleChangeMax} disabled={disabled} />
          <label htmlFor="text-max-cal">до</label>
        </div>
      </div>

      <RangeSlider 
        value={caloryValue} 
        onChange={handleChange} 
        onChanged={handleChanged} 
        min={CaloryRange.Min} 
        max={CaloryRange.Max} 
        step={CaloryRange.Step}
        disabled={disabled}
      />
    </div>
  );
};

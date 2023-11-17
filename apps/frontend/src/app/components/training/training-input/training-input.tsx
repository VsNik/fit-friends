import React from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

export enum TrainingInputType {
  Title = 'title',
  Price = 'price',
  Rating = 'rating',
}

interface TrainingInputProps {
  name: string;
  label?: string;
  defaultValue?: string;
  className?: string;
  pricing?: boolean;
}

export const TrainingInput: React.FC<TrainingInputProps> = ({ name, label, defaultValue, className, pricing }) => {
    const {register, formState: {errors}} = useFormContext();
    
  return (
    <div
      className={clsx('training-info__input', className, {
        'is-invalid': errors[name],
      })}
    >
      <label>
        <span className="training-info__label">{label}</span>
        <span className="training-info__rating-icon">
        </span>
        <input {...register(name)} type='text' name={name} value={defaultValue} />
        {/* {pricing &&<span className='suffex'>₽</span>} */}
      </label>
      <div className="training-info__error">Обязательное поле</div>
    </div>
  );
};

import React from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

interface TrainingInputProps {
  name: string;
  label?: string;
  value?: string;
  className?: string;
  pricing?: boolean;
  disabled?: boolean;
}

export const TrainingInput: React.FC<TrainingInputProps> = ({ name, label, value, className, disabled }) => {
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
        <input {...register(name)} type='text' name={name} value={value} data-testid='training-info-input' disabled={disabled} />
      </label>
      {errors[name] && <div className="training-info__error">{errors[name]?.message as string}</div>}
    </div>
  );
};

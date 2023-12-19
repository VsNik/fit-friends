import React from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

interface TrainingTextareaProps {
  name: string;
  text?: string;
  label?: string;
  disabled?: boolean;
}

export const TrainingTextarea: React.FC<TrainingTextareaProps> = ({ name, label, text, disabled }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={clsx('training-info__textarea', { 'is-invalid': errors[name], })}>
      <label>
        <span className="training-info__label">{label}</span>
        <textarea {...register(name)} name={name} value={text} data-testid='training-info-textarea' disabled={disabled} />
      </label>
      {errors[name] && <div className="training-info__error">{errors[name]?.message as string}</div>}
    </div>
  );
};

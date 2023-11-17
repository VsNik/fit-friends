import React from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

interface TrainingTextareaProps {
  name: string;
  text?: string;
  label?: string;
}

export const TrainingTextarea: React.FC<TrainingTextareaProps> = ({ name, label, text }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={clsx('training-info__textarea', { 'is-invalid': errors[name] })}>
      <label>
        <span className="training-info__label">{label}</span>
        <textarea {...register(name)} name={name}>
          {text}
        </textarea>
      </label>
    </div>
  );
};

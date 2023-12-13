import React from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

interface TextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  dataTestId?: string;
}

export const Textarea: React.FC<TextareaProps> = (props) => {
  const { name, label, placeholder, className, disabled, dataTestId } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className={clsx('custom-textarea', className, {
        'custom-textarea--readonly': disabled,
      })}
    >
      <label>
        <span className="custom-textarea__label">{label}</span>
        <textarea {...register(name)} name={name} placeholder={placeholder} data-testid={dataTestId} disabled={disabled} />
        {errors[name] && <i className="custom-textarea__error">{errors[name]?.message as string}</i>}
      </label>
    </div>
  );
};

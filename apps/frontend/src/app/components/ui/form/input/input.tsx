import React from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  text?: string;
  className?: string;
  isErrorMessage?: boolean;
  disabled?: boolean;
  dataTestId?: string;
}

export const Input: React.FC<InputProps> = (props) => {
  const {label, name, type, placeholder, className, text, disabled, dataTestId, isErrorMessage = true} = props;
  const {register, formState: {errors}} = useFormContext();

  return (
    <div
      className={clsx('custom-input', className, {
        'custom-input--error': errors[name],
        'custom-input--readonly': disabled
      })}
    >
      <label>
        <span className="custom-input__label">{label}</span>
        <span className="custom-input__wrapper">
        <input
            {...register(name)}
            type={type}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            data-testid={dataTestId}
          />
          {text && <span className="custom-input__text">{text}</span>}
        </span>
        {(isErrorMessage && errors[name]) && <i className="custom-input__error">{errors[name]?.message as string}</i>}
      </label>
    </div>
  );
};

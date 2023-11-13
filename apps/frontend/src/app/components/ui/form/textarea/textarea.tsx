import React from 'react';
import { useFormContext } from 'react-hook-form';

interface TextareaProps {
  name: string;
  placeholder?: string;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ name, placeholder, className }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`custom-textarea ${className}`}>
      <label>
        <textarea {...register(name)} name={name} placeholder={placeholder} />
        {errors[name] && <i className="custom-textarea__error">{errors[name]?.message as string}</i>}
      </label>
    </div>
  );
};

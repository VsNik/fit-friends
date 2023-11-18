import React from 'react';
import clsx from 'clsx';

interface ButtonUploadFloatProps {
    name: string;
    text: string;
    icon?: string;
    accept?: string;
    className?: string;
    underline?: boolean;
    value?: string;
    onChange?: () => void;
}

export const ButtonUploadFloat: React.FC<ButtonUploadFloatProps> = (props) => {
    const {name, text, icon, accept, className, underline, value, onChange} = props;

  return (
    <label className={clsx('btn-flat', className, {'btn-flat--underlined': underline})}>
      <input 
        className="visually-hidden" 
        type="file" 
        name={name} 
        value={value}
        accept={accept}
        onChange={onChange} 
      />
      <svg width="14" height="14" aria-hidden="true">
        <use xlinkHref={`/assets/img/sprite.svg#${icon}`} />
      </svg>
      <span>{text}</span>
    </label>
  );
};

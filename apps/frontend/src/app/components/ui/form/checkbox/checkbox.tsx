import React, { ChangeEvent } from 'react';
import clsx from 'clsx';

interface CheckboxProps {
  name: string;
  value?: string;
  label?: string;
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  dataTestId?: string;
}

export const Checkbox: React.FC<CheckboxProps> = (props) => {
  const { name, value, label, onChange, className, checked, defaultChecked, disabled, dataTestId } = props;

  return (
    <div className={clsx('custom-toggle', 'custom-toggle--checkbox', className)}>
      <label>
        <input 
            type="checkbox" 
            value={value} 
            name={name} 
            onChange={onChange} 
            checked={checked} 
            defaultChecked={defaultChecked} 
            disabled={disabled}
            data-testid={dataTestId}
        />
        <span className="custom-toggle__icon">
          <svg width="9" height="6" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#arrow-check" />
          </svg>
        </span>
        <span className="custom-toggle__label">{label}</span>
      </label>
    </div>
  );
};

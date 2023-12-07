import React from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

interface ToggleProps {
  name: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = (props) => {
  const { name, label, className, disabled } = props;
  const methods = useFormContext()

  const options = {
    type: "checkbox",
    name,
    disabled,
  }

  return (
    <div className={clsx('custom-toggle custom-toggle--switch', className)}>
      <label>
        {methods 
          ? <input {...methods.register(name)} {...options} defaultChecked />
          : <input {...options} defaultChecked />
        }
        
        <span className="custom-toggle__icon">
          <svg width="9" height="6" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#arrow-check" />
          </svg>
        </span>
        {label && <span className="custom-toggle__label">{label}</span>}
      </label>
    </div>
  );
};

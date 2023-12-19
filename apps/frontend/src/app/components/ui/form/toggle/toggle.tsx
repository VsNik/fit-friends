import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

interface ToggleProps {
  name: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  value?: string;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  dataTestId?: string;
}

export const Toggle: React.FC<ToggleProps> = (props) => {
  const { name, label, className, disabled, checked, value, onChange, dataTestId } = props;
  const methods = useFormContext()

  const options = {
    type: "checkbox",
    name,
    disabled,
    checked,
    value,
    onChange,
    'data-testid': dataTestId
  }

  return (
    <div className={clsx('custom-toggle custom-toggle--switch', className)}>
      <label>
        {methods 
          ? <input {...methods.register(name)} {...options} />
          : <input {...options} />
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

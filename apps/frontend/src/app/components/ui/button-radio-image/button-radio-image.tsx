import React, { ChangeEvent } from 'react';

interface ButtonRadioImageProps {
  image: string;
  name: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
  dataTestId?: string;
}

export const ButtonRadioImage: React.FC<ButtonRadioImageProps> = (props) => {
  const { image, name, value, onChange, checked, disabled, dataTestId } = props;
  return (
    <div className="btn-radio-image">
      <label>
        <input type="radio" name={name} value={value} aria-label="Iomoney." onChange={onChange} checked={checked} data-testid={dataTestId} disabled={disabled} />
        <span className="btn-radio-image__image">
          <svg width="106" height="24" aria-hidden="true">
            <use xlinkHref={`/assets/img/sprite.svg#${image}`} />
          </svg>
        </span>
      </label>
    </div>
  );
};

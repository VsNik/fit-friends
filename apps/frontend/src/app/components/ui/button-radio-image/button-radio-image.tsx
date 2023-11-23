import React, { ChangeEvent } from 'react';

interface ButtonRadioImageProps {
  image: string;
  name: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
}

export const ButtonRadioImage: React.FC<ButtonRadioImageProps> = (props) => {
  const { image, name, value, onChange, checked, disabled } = props;
  return (
    <div className="btn-radio-image">
      <label>
        <input type="radio" name={name} value={value} aria-label="Iomoney." onChange={onChange} checked={checked} disabled={disabled} />
        <span className="btn-radio-image__image">
          <svg width="106" height="24" aria-hidden="true">
            <use xlinkHref={`/assets/img/sprite.svg#${image}`} />
          </svg>
        </span>
      </label>
    </div>
  );
};

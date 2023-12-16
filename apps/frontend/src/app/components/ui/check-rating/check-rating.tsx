import React, { ChangeEvent } from 'react';
import { useFormContext } from 'react-hook-form';

interface CheckRatingProps {
  onChange?: (value: ChangeEvent<HTMLInputElement>) => void;
  value?: number;
}

export const CheckRating: React.FC<CheckRatingProps> = (props) => {
  const {register} = useFormContext()

  const { value, onChange } = props;
  return (
    <ul className="popup__rate-list" data-testid='check-rating-component'>
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <li key={index} className="popup__rate-item">
            <div className="popup__rate-item-wrap">
              <label>
                <input 
                  {...register('rating')}
                  type="radio" 
                  name="rating" 
                  value={index + 1} 
                  onChange={onChange} 
                  checked={value === index + 1}
                  data-testid='checkbox-rating' 
                />
                <span className="popup__rate-number">{index + 1}</span>
              </label>
            </div>
          </li>
        ))}
    </ul>
  );
};

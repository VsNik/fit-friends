import React, { ChangeEvent } from 'react';

interface CheckRatingProps {
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  value: number;
}

export const CheckRating: React.FC<CheckRatingProps> = (props) => {
  const { value, onChange } = props;
  return (
    <ul className="popup__rate-list">
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <li key={index} className="popup__rate-item">
            <div className="popup__rate-item-wrap">
              <label>
                <input 
                  type="radio" 
                  name="rating" 
                  value={index + 1} 
                  onChange={onChange} 
                  checked={value === index + 1} 
                />
                <span className="popup__rate-number">{index + 1}</span>
              </label>
            </div>
          </li>
        ))}
    </ul>
  );
};

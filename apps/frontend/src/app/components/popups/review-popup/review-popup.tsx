import React, { ChangeEvent, useState } from 'react';
import { Button } from '../../ui/button/button';
import { PopupHeader } from '../popup-header/popup-header';

interface ReviewPopupProps {
  onClose: () => void;
  title: string;
  trainingId: string;
}

export const ReviewPopup: React.FC<ReviewPopupProps> = (props) => {
  const { title, trainingId, onClose } = props;
  const [rating, setRating] = useState<number>(0);
  const [text, setText] = useState<string>('');

  const handleSetRating = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(evt.target.value, 10);
    setRating(value);
  };

  const onSubmit = () => {
    console.log({
        trainingId,
        text,
        rating
    })
    setRating(0);
    setText('');
  }

  return (
    <div className="popup__wrapper">
      <PopupHeader onClose={onClose} title={title} />
      <div className="popup__content popup__content--feedback">
        <h3 className="popup__feedback-title">Оцените тренировку</h3>

        <ul className="popup__rate-list">
          <li className="popup__rate-item">
            <div className="popup__rate-item-wrap">
              <label>
                <input type="radio" name="оценка тренировки" aria-label="оценка 1." value="1" onChange={handleSetRating} checked={rating === 1} />
                <span className="popup__rate-number">1</span>
              </label>
            </div>
          </li>
          <li className="popup__rate-item">
            <div className="popup__rate-item-wrap">
              <label>
                <input type="radio" name="оценка тренировки" aria-label="оценка 2." value="2" onChange={handleSetRating} checked={rating === 2} />
                <span className="popup__rate-number">2</span>
              </label>
            </div>
          </li>
          <li className="popup__rate-item">
            <div className="popup__rate-item-wrap">
              <label>
                <input type="radio" name="оценка тренировки" aria-label="оценка 3." value="3" onChange={handleSetRating} checked={rating === 3} />
                <span className="popup__rate-number">3</span>
              </label>
            </div>
          </li>
          <li className="popup__rate-item">
            <div className="popup__rate-item-wrap">
              <label>
                <input type="radio" name="оценка тренировки" aria-label="оценка 4." value="4" onChange={handleSetRating} checked={rating === 4} />
                <span className="popup__rate-number">4</span>
              </label>
            </div>
          </li>
          <li className="popup__rate-item">
            <div className="popup__rate-item-wrap">
              <label>
                <input type="radio" name="оценка тренировки" aria-label="оценка 5." value="5" onChange={handleSetRating} checked={rating === 5} />
                <span className="popup__rate-number">5</span>
              </label>
            </div>
          </li>
        </ul>
        <div className="popup__feedback">
          <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
          <div className="popup__feedback-textarea">
            <div className="custom-textarea">
              <label>
                <textarea name="description" value={text} placeholder=" " onChange={(evt) => setText(evt.target.value)}></textarea>
              </label>
            </div>
          </div>
        </div>
        <div className="popup__button">
          <Button text="Продолжить" onClick={onSubmit} disabled={!text} />
        </div>
      </div>
    </div>
  );
};

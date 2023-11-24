import React, { ChangeEvent, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { Button } from '../../ui/button/button';
import { PopupHeader } from '../popup-header/popup-header';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addReviewAction } from '../../../store/reviews/async-actions';
import { Loader } from '../../loader/loader';
import { CheckRating } from '../../ui/check-rating/check-rating';

interface ReviewPopupProps {
  onClose: () => void;
  title: string;
  trainingId: string;
}

export const ReviewPopup: React.FC<ReviewPopupProps> = (props) => {
  const dispatch = useAppDispatch();
  const { title, trainingId, onClose } = props;
  const [rating, setRating] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const isLoading = useAppSelector((state) => state.REVIEWS.isLoading);

  const handleSetRating = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(evt.target.value, 10);
    setRating(value);
  };

  const closePopup = () => {
    setRating(0);
    setText('');
    onClose();
  };

  const onSubmit = () => {
    dispatch(addReviewAction({ trainingId, rating, text })).then(closePopup);
  };

  return (
    <FocusLock>
      <div className="popup__wrapper">
        <PopupHeader onClose={onClose} title={title} />
        <div className="popup__content popup__content--feedback">
          {isLoading && <Loader />}
          <h3 className="popup__feedback-title">Оцените тренировку</h3>

          <CheckRating value={rating} onChange={handleSetRating} />

          <div className="popup__feedback">
            <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
            <div className="popup__feedback-textarea">
              <div className="custom-textarea">
                <label>
                  <textarea name="description" value={text} placeholder=" " onChange={(evt) => setText(evt.target.value)} />
                </label>
              </div>
            </div>
          </div>

          <div className="popup__button">
            <Button text="Продолжить" onClick={onSubmit} disabled={!text} />
          </div>
        </div>
      </div>
    </FocusLock>
  );
};

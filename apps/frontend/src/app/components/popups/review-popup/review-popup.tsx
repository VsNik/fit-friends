import React, { ChangeEvent, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../ui/button/button';
import { PopupHeader } from '../popup-header/popup-header';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addReviewAction } from '../../../store/reviews/async-actions';
import { Loader } from '../../loader/loader';
import { CheckRating } from '../../ui/check-rating/check-rating';
import { LoadStatus } from '../../../constants/common';
import { reviewSchema } from '../../../utils/validate-schemas';
import { CreateReviewType } from '../../../types/forms-type';
import * as reviewsSelector from '../../../store/reviews/reviews-select';

interface ReviewPopupProps {
  onClose: () => void;
  title: string;
  trainingId: string;
}

export const ReviewPopup: React.FC<ReviewPopupProps> = (props) => {
  const dispatch = useAppDispatch();
  const { title, trainingId, onClose } = props;
  const [rating, setRating] = useState<number>(0);
  const loadStatus = useAppSelector(reviewsSelector.loadStatus);
  const isLoading = loadStatus === LoadStatus.Loading;

  const methods = useForm<CreateReviewType>({
    defaultValues: {rating: 0},
    resolver: yupResolver(reviewSchema),
  });

  const { handleSubmit, register, reset, formState: {errors} } = methods;

  const handleSetRating = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(evt.target.value, 10);
    setRating(value);
  };

  const onSubmit = (data: CreateReviewType) => {
    dispatch(addReviewAction({ id: trainingId, review: data })).unwrap()
      .then(() => {
        reset();
        onClose();
      })
  };

  return (
    <FocusLock>
      <div className="popup__wrapper">
        <PopupHeader onClose={onClose} title={title} />
        <div className="popup__content popup__content--feedback">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {isLoading && <Loader />}
              <h3 className="popup__feedback-title">Оцените тренировку</h3>
              <CheckRating value={rating} onChange={handleSetRating} />
              <div className="popup__feedback">
                <h3 className="popup__feedback-title popup__feedback-title--text">Поделитесь своими впечатлениями о тренировке</h3>
                <div className="popup__feedback-textarea">
                  <div className="custom-textarea">
                    <label>
                      <textarea {...register('text')} name="text" placeholder=" " data-testid='review-textarea' />
                    </label>                    
                  </div>
                  {errors.text && <i className='popup__feedback-textarea-error'>{errors.text?.message}</i>}
                </div>
              </div>
              <div className="popup__button">
                <Button text="Продолжить" type='submit' dataTestId='submit-button-element' />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </FocusLock>
  );
};

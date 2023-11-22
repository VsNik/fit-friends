import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchReviewsAction } from '../../store/reviews/async-actions';
import { ThumbnailReview } from '../thumbnails/thumbnail-review/thumbnail-review';
import { Button } from '../ui/button/button';
import { ButtonFloat } from '../ui/button-float/button-float';
import { RouteName } from '../../app';

interface ReviewsBarProps {
  trainingId: string;
}

export const ReviewsBar: React.FC<ReviewsBarProps> = ({trainingId}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const reviews = useAppSelector((state) => state.reviews.reviews);

  useEffect(() => {
    dispatch(fetchReviewsAction(trainingId));
  }, [dispatch, trainingId]);

  return (
    <aside className="reviews-side-bar">
      <ButtonFloat 
        text='Назад' 
        icon='arrow-left' 
        className='reviews-side-bar__back' 
        onClick={() => navigation(RouteName.Home)} 
        underline 
      />

      <h2 className="reviews-side-bar__title">Отзывы</h2>
      <ul className="reviews-side-bar__list">
        {reviews?.map((review) => (
          <ThumbnailReview key={review.id} review={review} />
        ))}
      </ul>
      <Button 
        text='Оставить отзыв'
        onClick={() => {}} 
        className='reviews-side-bar__button' 
        medium 
        disabled 
      />
    </aside>
  );
};

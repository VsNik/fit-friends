import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchReviewsAction } from '../../store/reviews/async-actions';
import { ThumbnailReview } from '../thumbnails/thumbnail-review/thumbnail-review';
import { Button } from '../ui/button/button';

export const ReviewsBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => state.reviews.reviews);

  useEffect(() => {
    dispatch(fetchReviewsAction());
  }, [dispatch]);

  return (
    <aside className="reviews-side-bar">
      <button className="btn-flat btn-flat--underlined reviews-side-bar__back" type="button">
        <svg width="14" height="10" aria-hidden="true">
          <use xlinkHref="/assets/img/sprite.svg#arrow-left" />
        </svg>
        <span>Назад</span>
      </button>
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

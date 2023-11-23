import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ThumbnailReview } from '../thumbnails/thumbnail-review/thumbnail-review';
import { Button } from '../ui/button/button';
import { ButtonFloat } from '../ui/button-float/button-float';
import { IReview, Role } from '@fit-friends/shared';
import { RouteName } from '../../constants/route';

interface ReviewsBarProps {
  reviews: IReview[];
  role: Role;
  onOpenPopup: () => void;
}

export const ReviewsBar: React.FC<ReviewsBarProps> = (props) => {
  const {reviews, role, onOpenPopup} = props;
  const navigation = useNavigate();

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
        onClick={onOpenPopup} 
        className='reviews-side-bar__button' 
        medium
        disabled={role === Role.Coach}
      />
    </aside>
  );
};

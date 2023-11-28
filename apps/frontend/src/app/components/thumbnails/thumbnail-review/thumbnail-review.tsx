import React from 'react';
import { IReview } from '@fit-friends/shared';
import { Avatar } from '../../ui/avatar/avatar';

interface ThumbnailReviewProps {
  review: IReview;
}

export const ThumbnailReview: React.FC<ThumbnailReviewProps> = ({ review }) => {
  return (
    <li className="reviews-side-bar__item">
      <div className="review">
        <div className="review__user-info">
          <Avatar src={review.user.avatar} width={64} height={64} className='review__user-photo' />
          <span className="review__user-name">{review.user.name}</span>
          <div className="review__rating">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#icon-star" />
            </svg>
            <span>{review.rating}</span>
          </div>
        </div>
        <p className="review__comment">{review.text}</p>
      </div>
    </li>
  );
};

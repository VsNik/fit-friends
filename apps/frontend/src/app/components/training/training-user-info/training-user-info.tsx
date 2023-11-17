import React from 'react';

export const TrainingUserInfo: React.FC = () => {
  return (
    <div className="training-info__coach">
      <div className="training-info__photo">
        <picture>
          <source
            type="image/webp"
            srcSet="/assets/img/content/avatars/coaches/photo-1.webp, /assets/img/content/avatars/coaches/photo-1@2x.webp 2x"
          />
          <img
            src="/assets/img/content/avatars/coaches/photo-1.png"
            srcSet="/assets/img/content/avatars/coaches/photo-1@2x.png 2x"
            width="64"
            height="64"
            alt="Изображение тренера"
          />
        </picture>
      </div>
      <div className="training-info__coach-info">
        <span className="training-info__label">Тренер</span>
        <span className="training-info__name">Валерия</span>
      </div>
    </div>
  );
};

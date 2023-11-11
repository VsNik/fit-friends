import React from 'react';

export const InputAvatar: React.FC = () => {
  return (
    <div className="input-load-avatar">
      <label>
        <input className="visually-hidden" type="file" accept="image/png, image/jpeg" />
        <span className="input-load-avatar__btn">
          <svg width="20" height="20" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-import" />
          </svg>
        </span>
      </label>
    </div>
  );
};

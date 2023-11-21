import React from 'react';
import clsx from 'clsx';

interface PopupHeaderProps {
  onClose: () => void;
  title?: string;
  address?: string;
  className?: string;
}

export const PopupHeader: React.FC<PopupHeaderProps> = (props) => {
  const { onClose, title, address, className } = props;

  return (
    <div className={clsx('popup-head', className)}>
      <h2 className="popup-head__header">{title}</h2>
      {address && (
        <p className="popup-head__address">
          <svg className="popup-head__icon-location" width="12" height="14" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-location" />
          </svg>
          <span>м. {address}</span>
        </p>
      )}

      <button className="btn-icon btn-icon--outlined btn-icon--big" type="button" aria-label="close" onClick={onClose}>
        <svg width="20" height="20" aria-hidden="true">
          <use xlinkHref="/assets/img/sprite.svg#icon-cross" />
        </svg>
      </button>
    </div>
  );
};

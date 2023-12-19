import React from 'react';
import clsx from 'clsx';
import { ButtonIcon } from '../../ui/button-icon/button-icon';

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

      <ButtonIcon icon='icon-cross' onClick={onClose} outline big  dataTestId='close-popup-button'/>
    </div>
  );
};

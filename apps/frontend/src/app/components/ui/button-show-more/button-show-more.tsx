import React from 'react';
import clsx from 'clsx';
import { Button } from '../button/button';

interface ButtonShowMoreProps {
  onClick?: () => void;
  className: string;
  dataTestId?: string;
}

export const ButtonShowMore: React.FC<ButtonShowMoreProps> = ({ className, onClick, dataTestId }) => {
  return (
    <div className={clsx('show-more', className)}>
      <Button text="Показать еще" className="show-more__button show-more__button--more" type="button" onClick={onClick} dataTestId={dataTestId} />
      <Button text="Вернуться в начало" className="show-more__button show-more__button--to-top" type="button" onClick={onClick} />
    </div>
  );
};

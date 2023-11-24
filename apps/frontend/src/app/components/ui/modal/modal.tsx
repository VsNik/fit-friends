import React, { ReactNode, useEffect } from 'react';
import clsx from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const { isOpen, onClose, children } = props;

  useEffect(() => {
    const closeModal = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.classList.add('scroll-lock');
      document.body.style.paddingRight = '15px';      
      document.querySelector('.inner-page')?.setAttribute('inert', 'inert');
      window.addEventListener('keydown', closeModal);
    } else {
      document.body.classList.remove('scroll-lock');
      document.body.style.paddingRight = '';
      document.querySelector('.inner-page')?.removeAttribute('inert');
    }
    return () => window.removeEventListener('keydown', closeModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <div className={clsx('modal', { 'is-active': isOpen })}>
      <section className="popup">
        <div className="modal__overlay" onClick={onClose} />
        {isOpen && children}
      </section>
    </div>
  );
};

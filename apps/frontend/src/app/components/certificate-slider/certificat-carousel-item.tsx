import React, { useRef, useState } from 'react';
import { ButtonFloat } from '../ui/button-float/button-float';
import { ButtonIcon } from '../ui/button-icon/button-icon';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteSertificateAction, updateCertificateAction } from '../../store/auth/async-actions';
import clsx from 'clsx';

interface CertificatCarouselItemProps {
  userId: string;
  src: string;
  srcSet?: string;
  alt?: string;
  type?: string;
}

export const CertificatCarouselItem: React.FC<CertificatCarouselItemProps> = (props) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const { userId, src, srcSet, alt, type } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState<FileList | null>(null);
  const certificateRef = useRef<HTMLInputElement | null>(null);

  const onSave = () => {
    if (file) {
      dispatch(updateCertificateAction({ id: userId, src, certificate: file[0] }));
      setFile(null);
    }
    setIsEdit(false);
  };

  const onClickUpdate = () => {
    certificateRef.current?.click();
  };

  const onDelete = () => {
    dispatch(deleteSertificateAction({ id: userId, src }));
  };

  return (
    <div className="personal-account-coach__item">
      <div className={clsx('certificate-card', { 'certificate-card--edit': isEdit })}>
        <div className="certificate-card__image">
          <picture>
            <source type={type} srcSet={src} />
            <img src={src} srcSet={srcSet} width="294" height="360" alt={alt} />
          </picture>
        </div>

        <form className="certificate-card__buttons">
          <ButtonFloat
            text="Изменить"
            icon="icon-edit"
            className="certificate-card__button certificate-card__button--edit"
            onClick={() => setIsEdit(true)}
            underline
            disabled={isLoading}
          />

          <ButtonFloat
            text="Сохранить"
            icon="icon-edit"
            className="certificate-card__button certificate-card__button--save"
            onClick={() => onSave()}
            underline
            disabled={isLoading}
          />

          <div className="certificate-card__controls">
            <input
              className="visually-hidden"
              type="file"
              name="certificate"
              accept=".pdf, .jpg, .png"              
              onChange={(evt) => setFile(evt.target.files)}
              ref={certificateRef}
            />

            <ButtonIcon icon="icon-change" className="certificate-card__control" onClick={onClickUpdate} disabled={isLoading} />
            <ButtonIcon icon="icon-trash" className="certificate-card__control" onClick={onDelete} disabled={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useRef, useState } from 'react';
import { ButtonFloat } from '../../ui/button-float/button-float';
import { ButtonIcon } from '../../ui/button-icon/button-icon';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateCertificateAction, deleteSertificateAction } from '../../../store/user/async-actions';
import { Image } from '../../ui/image/image';
import * as authSelector from '../../../store/auth/auth-select';
import clsx from 'clsx';

interface ThumbnailCertificatProps {
  userId: string;
  src: string;
  srcSet?: string;
  alt?: string;
  type?: string;
}

export const ThumbnailCertificat: React.FC<ThumbnailCertificatProps> = (props) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(authSelector.isLoading);
  const { userId, src, alt } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [fileList, setFile] = useState<FileList | null>(null);
  const certificateRef = useRef<HTMLInputElement | null>(null);

  const onSave = () => {
    if (fileList) {
      const formData = new FormData();
      formData.append('certificate', fileList[0]);
      dispatch(updateCertificateAction({ id: userId, src, formData }));
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
        <Image src={src} width={294} height={360} alt={alt} className='certificate-card__image' />

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

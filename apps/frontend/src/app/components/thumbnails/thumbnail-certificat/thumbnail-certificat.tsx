import React, { useRef, useState } from 'react';
import { ButtonFloat } from '../../ui/button-float/button-float';
import { ButtonIcon } from '../../ui/button-icon/button-icon';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateCertificateAction, deleteSertificateAction } from '../../../store/user/async-actions';
import { LoadStatus } from '../../../constants/common';
import * as authSelector from '../../../store/auth/auth-select';
import clsx from 'clsx';

interface ThumbnailCertificatProps {
  userId: string;
  src: string;
  srcSet?: string;
  type?: string;
}

export const ThumbnailCertificat: React.FC<ThumbnailCertificatProps> = (props) => {
  const dispatch = useAppDispatch();
  const loadStatus = useAppSelector(authSelector.loadStatus);
  const { userId, src } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [fileList, setFile] = useState<FileList | null>(null);
  const certificateRef = useRef<HTMLInputElement | null>(null);

  const isLoading = loadStatus === LoadStatus.Loading;

  const onSave = () => {
    if (fileList) {
      const formData = new FormData();
      formData.append('certificate', fileList[0]);
      dispatch(updateCertificateAction({ id: userId, src, formData }));
      setFile(null);
    }
    certificateRef.current!.files = null;
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
        <div className='certificate-card__image'>
          <iframe src={`${src}#toolbar=0`} width={294} height={360} title='certificate' style={{border: 0}} />   
        </div>      
      
        <form className="certificate-card__buttons">
          <ButtonFloat
            text="Изменить"
            icon="icon-edit"
            className="certificate-card__button certificate-card__button--edit"
            onClick={() => setIsEdit(true)}
            underline
            disabled={loadStatus === LoadStatus.Loading}
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
              accept=".pdf"
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

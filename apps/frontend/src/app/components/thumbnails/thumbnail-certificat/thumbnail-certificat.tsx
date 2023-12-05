import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonFloat } from '../../ui/button-float/button-float';
import { ButtonIcon } from '../../ui/button-icon/button-icon';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateCertificateAction, deleteCertificateAction } from '../../../store/user/async-actions';
import { LoadStatus } from '../../../constants/common';
import { UpdateCertificateType } from '../../../types/forms-type';
import { updateCertificateSchema } from '../../../utils/validate-schemas';
import { useImagePreview } from '../../../hooks/use-image-preview';
import * as authSelector from '../../../store/auth/auth-select';
import clsx from 'clsx';

interface ThumbnailCertificatProps {
  src: string;
}

export const ThumbnailCertificat: React.FC<ThumbnailCertificatProps> = ({ src }) => {
  const dispatch = useAppDispatch();
  const loadStatus = useAppSelector(authSelector.loadStatus);
  const [isEdit, setIsEdit] = useState(false);

  const isLoading = loadStatus === LoadStatus.Loading;

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<UpdateCertificateType>({
    resolver: yupResolver(updateCertificateSchema),
  });

  const certificate = watch('certificate');

  const { previewImage } = useImagePreview(certificate as FileList);

  const onSave = (data: UpdateCertificateType) => {
    const certificateFile = data.certificate as FileList;
    if (certificateFile[0]) {
      const formData = new FormData();
      formData.append('certificate', certificateFile[0]);
      formData.append('src', src);
      console.log(formData.get('certificate'));
      dispatch(updateCertificateAction(formData))
        .unwrap()
        .then(() => setIsEdit(false));
    } else {
      setIsEdit(false);
    }
  };

  const onDelete = () => {
    dispatch(deleteCertificateAction(src))
      .unwrap()
      .then(() => setIsEdit(false));
  };

  return (
    <div className="personal-account-coach__item">
      {errors['certificate'] && (
        <i className="custom-input__error" style={{ top: '0' }}>
          {errors['certificate'].message}
        </i>
      )}
      <div className={clsx('certificate-card', { 'certificate-card--edit': isEdit })}>
        <div className="certificate-card__image">
          <iframe src={`${previewImage || src}#toolbar=0`} width={294} height={360} title="certificate" style={{ border: 0 }} />
        </div>

        <form className="certificate-card__buttons" onSubmit={handleSubmit(onSave)}>
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
            type="submit"
            underline
            disabled={isLoading}
          />

          <div className="certificate-card__controls">
            <label className="btn-icon certificate-card__control" aria-label="previous">
              <svg width={16} height={14} aria-hidden="true">
                <use xlinkHref={`/assets/img/sprite.svg#icon-change`} />
              </svg>
              <input {...register('certificate')} className="visually-hidden" type="file" accept=".pdf" />
            </label>

            <ButtonIcon icon="icon-trash" className="certificate-card__control" onClick={onDelete} disabled={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
};

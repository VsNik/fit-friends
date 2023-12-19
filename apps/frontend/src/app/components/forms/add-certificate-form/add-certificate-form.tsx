import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addCertificateSchema } from '../../../utils/validate-schemas';
import { AddCertificateType } from '../../../types/forms-type';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addCertificateAction } from '../../../store/user/async-actions';
import { useServerFormError } from '../../../hooks/use-server-form-error';
import * as userSelector from '../../../store/user/user-select';

interface addCertificateFormProps {
  userId: string;
  disabled?: boolean;
  dataTestId?: string;
}

export const AddCertificateForm: React.FC<addCertificateFormProps> = ({ userId, disabled, dataTestId }) => {
  const dispatch = useAppDispatch();
  const userError = useAppSelector(userSelector.error);

  const {
    handleSubmit,
    register,
    control,
    setError,
    formState: { errors },
  } = useForm<AddCertificateType>({
    resolver: yupResolver(addCertificateSchema),
  });

  const certificateData = useWatch({ control, name: 'certificate' });
  useServerFormError<AddCertificateType>(setError, userError);

  useEffect(() => {
    if (certificateData) {
      handleSubmit(onSubmit)();
    }
    // eslint-disable-next-line
  }, [certificateData]);

  const onSubmit = (data: AddCertificateType) => {
    const certificate = data.certificate as FileList;
    const formData = new FormData();
    formData.append('certificate', certificate[0]);
    dispatch(addCertificateAction(formData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid={dataTestId}>
      <label className="btn-flat btn-flat--underlined personal-account-coach__button">
        <input {...register('certificate')} type="file" className="visually-hidden" disabled={disabled} data-testid='upload-button' />
        <svg width="14" height="14" aria-hidden="true">
          <use xlinkHref="/assets/img/sprite.svg#icon-import"></use>
        </svg>
        <span>Загрузить</span>
      </label>
      {errors['certificate'] && <i className="personal-account-coach__add-certificate-error">{errors['certificate'].message}</i>}
    </form>
  );
};

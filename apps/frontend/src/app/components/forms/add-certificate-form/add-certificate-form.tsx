import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { addCertificateSchema } from '../../../utils/validate-schemas';
import { AddCertificateType } from '../../../types/forms-type';
import { useAppDispatch } from '../../../store/hooks';
import { addCertificateAction } from '../../../store/user/async-actions';

interface addCertificateFormProps {
  userId: string;
  disabled?: boolean;
}

export const AddCertificateForm: React.FC<addCertificateFormProps> = ({ userId, disabled }) => {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<AddCertificateType>({
    resolver: yupResolver(addCertificateSchema),
  });
  const certificateData = useWatch({ control, name: 'certificate' });

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
    console.log(certificate[0]);
    dispatch(addCertificateAction({ id: userId, formData }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="btn-flat btn-flat--underlined personal-account-coach__button">
        <input {...register('certificate')} type="file" className="visually-hidden" disabled={disabled} />
        <svg width="14" height="14" aria-hidden="true">
          <use xlinkHref="/assets/img/sprite.svg#icon-import"></use>
        </svg>
        <span>Загрузить</span>
      </label>
      {errors['certificate'] && <i className="personal-account-coach__add-certificate-error">{errors['certificate'].message}</i>}
    </form>
  );
};

import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TrainingType } from '@fit-friends/shared';
import { BtnCheckbox } from '../../ui/form/btn-checkbox/btn-checkbox';

interface SpecializationGroupProps {
    className?: string;
    disabled?: boolean;
}

export const SpecializationGroup: React.FC<SpecializationGroupProps> = ({className, disabled}) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className={clsx('specialization-checkbox', className)}>
      <BtnCheckbox name="trainingType" value={TrainingType.Yoga} label="Йога" disabled={disabled} />
      <BtnCheckbox name="trainingType" value={TrainingType.Beg} label="Бег" disabled={disabled} />
      <BtnCheckbox name="trainingType" value={TrainingType.Power} label="Силовые" disabled={disabled} />
      <BtnCheckbox name="trainingType" value={TrainingType.Aerobic} label="Аэробика" disabled={disabled} />
      <BtnCheckbox name="trainingType" value={TrainingType.Crossfit} label="Кроссфит" disabled={disabled} />
      <BtnCheckbox name="trainingType" value={TrainingType.Boxing} label="Бокс" disabled={disabled} />
      <BtnCheckbox name="trainingType" value={TrainingType.Pilates} label="Пилатес" disabled={disabled} />
      <BtnCheckbox name="trainingType" value={TrainingType.Stretching} label="Стрейчинг" disabled={disabled} />
      {errors['trainingType'] && <i className="custom-input__error">{errors['trainingType']?.message as string}</i>}
    </div>
  );
};

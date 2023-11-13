import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TrainingType } from '@fit-friends/shared';
import { BtnCheckbox } from '../../ui/form/btn-checkbox/btn-checkbox';

interface SpecializationGroupProps {
    className?: string;
}

export const SpecializationGroup: React.FC<SpecializationGroupProps> = ({className}) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className={clsx('specialization-checkbox', className)}>
      <BtnCheckbox name="trainingType" value={TrainingType.Yoga} label="Йога" />
      <BtnCheckbox name="trainingType" value={TrainingType.Beg} label="Бег" />
      <BtnCheckbox name="trainingType" value={TrainingType.Power} label="Силовые" />
      <BtnCheckbox name="trainingType" value={TrainingType.Aerobic} label="Аэробика" />
      <BtnCheckbox name="trainingType" value={TrainingType.Crossfit} label="Кроссфит" />
      <BtnCheckbox name="trainingType" value={TrainingType.Boxing} label="Бокс" />
      <BtnCheckbox name="trainingType" value={TrainingType.Pilates} label="Пилатес" />
      <BtnCheckbox name="trainingType" value={TrainingType.Stretching} label="Стрейчинг" />
      {errors['trainingType'] && <i className="custom-input__error">{errors['trainingType']?.message as string}</i>}
    </div>
  );
};

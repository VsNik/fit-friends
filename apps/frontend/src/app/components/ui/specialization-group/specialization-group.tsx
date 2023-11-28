import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TrainingType } from '@fit-friends/shared';
import { BtnCheckbox } from '../../ui/form/btn-checkbox/btn-checkbox';
import { getTrainingName } from '../../../utils/helpers';

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
      <BtnCheckbox name="trainingType" value={TrainingType.Yoga} label={getTrainingName(TrainingType.Yoga)} disabled={disabled} />
      <BtnCheckbox name="trainingType" value={TrainingType.Beg} label={getTrainingName(TrainingType.Beg)} disabled={disabled} />
      <BtnCheckbox name="trainingType" value={TrainingType.Power} label={getTrainingName(TrainingType.Power)} disabled={disabled} />
      <BtnCheckbox name="trainingType" value={TrainingType.Aerobic} label={getTrainingName(TrainingType.Aerobic)} disabled={disabled} />
      <BtnCheckbox name="trainingType" value={TrainingType.Crossfit} label={getTrainingName(TrainingType.Crossfit)} disabled={disabled} />
      <BtnCheckbox name="trainingType" value={TrainingType.Boxing} label={getTrainingName(TrainingType.Boxing)} disabled={disabled} />
      <BtnCheckbox name="trainingType" value={TrainingType.Pilates} label={getTrainingName(TrainingType.Pilates)} disabled={disabled} />
      <BtnCheckbox name="trainingType" value={TrainingType.Stretching} label={getTrainingName(TrainingType.Stretching)} disabled={disabled} />
      {errors['trainingType'] && <i className="custom-input__error">{errors['trainingType']?.message as string}</i>}
    </div>
  );
};

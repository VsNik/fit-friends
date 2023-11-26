import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputRadio } from '../../ui/form/input-radio/input-radio';
import { TrainingDuration } from '@fit-friends/shared';

interface DurationGroupProps {
  className?: string;
}

export const DurationGroup: React.FC<DurationGroupProps> = ({ className }) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className={clsx('custom-toggle-radio', className)}>
      <InputRadio label="10-30 мин" name="trainingDuration" value={TrainingDuration.Low} />
      <InputRadio label="30-50 мин" name="trainingDuration" value={TrainingDuration.Normal} />
      <InputRadio label="50-80 мин" name="trainingDuration" value={TrainingDuration.Hi} />
      <InputRadio label="80-100 мин" name="trainingDuration" value={TrainingDuration.Extra} />
      {errors['trainingDuration'] && <i className="custom-input__error">{errors['trainingDuration']?.message as string}</i>}
    </div>
  );
};

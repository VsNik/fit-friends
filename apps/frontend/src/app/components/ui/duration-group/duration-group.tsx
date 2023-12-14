import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputRadio } from '../../ui/form/input-radio/input-radio';
import { TrainingDuration } from '@fit-friends/shared';
import { getDurationName } from '../../../utils/helpers';

interface DurationGroupProps {
  className?: string;
  dataTestId?: string;
}

export const DurationGroup: React.FC<DurationGroupProps> = ({ className, dataTestId }) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className={clsx('custom-toggle-radio', className)}>
      <InputRadio label={getDurationName(TrainingDuration.Low)} name="trainingDuration" value={TrainingDuration.Low} dataTestId={dataTestId} />
      <InputRadio label={getDurationName(TrainingDuration.Normal)} name="trainingDuration" value={TrainingDuration.Normal} dataTestId={dataTestId} />
      <InputRadio label={getDurationName(TrainingDuration.Hi)} name="trainingDuration" value={TrainingDuration.Hi} dataTestId={dataTestId} />
      <InputRadio label={getDurationName(TrainingDuration.Extra)} name="trainingDuration" value={TrainingDuration.Extra} dataTestId={dataTestId} />
      {errors['trainingDuration'] && <i className="custom-input__error">{errors['trainingDuration']?.message as string}</i>}
    </div>
  );
};

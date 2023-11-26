import clsx from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputRadio } from '../../ui/form/input-radio/input-radio';
import { TrainingLevel } from '@fit-friends/shared';

interface LevelGroupProps {
  className?: string;
}

export const LevelGroup: React.FC<LevelGroupProps> = ({ className }) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className={clsx('custom-toggle-radio', className)}>
      <InputRadio label="Новичок" name="trainingLevel" value={TrainingLevel.Novice} />
      <InputRadio label="Любитель" name="trainingLevel" value={TrainingLevel.Amateur} />
      <InputRadio label="Профессионал" name="trainingLevel" value={TrainingLevel.Professional} />
      {errors['trainingLevel'] && <i className="custom-input__error">{errors['trainingLevel']?.message as string}</i>}
    </div>
  );
};

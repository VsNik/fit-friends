import React, { ChangeEvent } from 'react';
import { InputRadio } from '../form/input-radio/input-radio';
import { TrainingLevel } from '@fit-friends/shared';
import clsx from 'clsx';
import { getLevelName } from '../../../utils/helpers';

interface CheckLevelProps {
  name: string;
  level: TrainingLevel | '';
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

export const CheckLevel: React.FC<CheckLevelProps> = (props) => {
  const { name, level, onChange, className, disabled } = props;

  return (
    <div className={clsx('custom-toggle-radio', className)}>
      <InputRadio
        name={name}
        value={TrainingLevel.Novice}
        label={getLevelName(TrainingLevel.Novice)}
        onChange={onChange}
        checked={level === TrainingLevel.Novice}
        disabled={disabled}
      />
      <InputRadio
        name={name}
        value={TrainingLevel.Amateur}
        label={getLevelName(TrainingLevel.Amateur)}
        onChange={onChange}
        checked={level === TrainingLevel.Amateur}
        disabled={disabled}
      />
      <InputRadio
        name={name}
        value={TrainingLevel.Professional}
        label={getLevelName(TrainingLevel.Professional)}
        onChange={onChange}
        checked={level === TrainingLevel.Professional}
        disabled={disabled}
      />
    </div>
  );
};

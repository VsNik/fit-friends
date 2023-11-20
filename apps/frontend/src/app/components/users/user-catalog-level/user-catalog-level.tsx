import React, { ChangeEvent } from 'react';
import { InputRadio } from '../../ui/form/input-radio/input-radio';
import { TrainingLevel } from '@fit-friends/shared';
import clsx from 'clsx';

interface UserCatalogLevelProps {
  name: string;
  level: TrainingLevel | '';
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

export const UserCatalogLevel: React.FC<UserCatalogLevelProps> = (props) => {
  const { name, level, onChange, className, disabled } = props;

  return (
    <div className={clsx('custom-toggle-radio', className)}>
      <InputRadio
        name={name}
        value={TrainingLevel.Novice}
        label="Новичок"
        onChange={onChange}
        checked={level === TrainingLevel.Novice}
        disabled={disabled}
      />
      <InputRadio
        name={name}
        value={TrainingLevel.Amateur}
        label="Любитель"
        onChange={onChange}
        checked={level === TrainingLevel.Amateur}
        disabled={disabled}
      />
      <InputRadio
        name={name}
        value={TrainingLevel.Professional}
        label="Профессионал"
        onChange={onChange}
        checked={level === TrainingLevel.Professional}
        disabled={disabled}
      />
    </div>
  );
};

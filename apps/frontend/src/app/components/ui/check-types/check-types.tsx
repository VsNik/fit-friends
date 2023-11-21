import { TrainingType } from '@fit-friends/shared';
import React, { ChangeEvent } from 'react';
import { Checkbox } from '../form/checkbox/checkbox';

interface CheckTypesProps {
  name: string;
  types: TrainingType[] | undefined;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

export const CheckTypes: React.FC<CheckTypesProps> = (props) => {
  const { name, types, onChange, className, disabled } = props;
  const hasTrainingType = (trainingType: TrainingType) => types?.includes(trainingType);

  return (
    <ul className={className}>
    {Object.values(TrainingType).map((type) => (
      <li key={type} className={`${className}-item`}>
        <Checkbox value={type} name={name} label={type} onChange={onChange} checked={hasTrainingType(type)} disabled={disabled} />
      </li>
    ))}
  </ul>
  );
};

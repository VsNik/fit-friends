import { TrainingType } from '@fit-friends/shared';
import React, { ChangeEvent } from 'react';
import { Checkbox } from '../form/checkbox/checkbox';
import { getTrainingName } from '../../../utils/helpers';

interface CheckTypesProps {
  name: string;
  types: TrainingType[] | undefined;
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  dataTestId?: string;
}

export const CheckTypes: React.FC<CheckTypesProps> = (props) => {
  const { name, types, onChange, className, disabled, dataTestId } = props;
  const hasTrainingType = (trainingType: TrainingType) => types?.includes(trainingType);

  return (
    <ul className={className}>
    {Object.values(TrainingType).map((type) => (
      <li key={type} className={`${className}-item`}>
        <Checkbox 
          value={type} 
          name={name} 
          label={getTrainingName(type)} 
          onChange={onChange} 
          checked={hasTrainingType(type)} 
          disabled={disabled} 
          dataTestId={dataTestId}
        />
      </li>
    ))}
  </ul>
  );
};

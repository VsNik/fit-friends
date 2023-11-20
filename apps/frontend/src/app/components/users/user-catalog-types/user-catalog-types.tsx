import { TrainingType } from '@fit-friends/shared';
import React, { ChangeEvent } from 'react';
import { Checkbox } from '../../ui/form/checkbox/checkbox';

interface UserCatalogTypesProps {
  name: string;
  types: TrainingType[];
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

export const UserCatalogTypes: React.FC<UserCatalogTypesProps> = (props) => {
  const { name, types, onChange, disabled } = props;
  const hasTrainingType = (trainingType: TrainingType) => types.includes(trainingType);

  return (
    <ul className="user-catalog-form__check-list">
      {Object.values(TrainingType).map((type) => (
        <li key={type} className="user-catalog-form__check-list-item">
          <Checkbox value={type} name={name} label={type} onChange={onChange} checked={hasTrainingType(type)} disabled={disabled} />
        </li>
      ))}
    </ul>
  );
};

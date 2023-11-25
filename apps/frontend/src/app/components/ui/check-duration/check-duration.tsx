import React, { ChangeEvent } from 'react';
import { Checkbox } from '../form/checkbox/checkbox';
import { TrainingDuration } from '@fit-friends/shared';
import { getDurationName } from '../../../utils/helpers';

interface CheckDurationProps {
  name: string;
  durations: TrainingDuration[];
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const CheckDuration: React.FC<CheckDurationProps> = (props) => {
  const { name, durations, onChange, disabled } = props;
  const hasDuration = (duration: TrainingDuration) => durations.includes(duration);

  return (
    <ul className="my-training-form__check-list">
      <li className="my-training-form__check-list-item">
        <Checkbox
          label={getDurationName(TrainingDuration.Low)}
          name={name}
          value={TrainingDuration.Low}
          onChange={onChange}
          checked={hasDuration(TrainingDuration.Low)}
          disabled={disabled}
        />
      </li>
      <li className="my-training-form__check-list-item">
        <Checkbox
          label={getDurationName(TrainingDuration.Normal)}
          name={name}
          value={TrainingDuration.Normal}
          onChange={onChange}
          checked={hasDuration(TrainingDuration.Normal)}
          disabled={disabled}
        />
      </li>
      <li className="my-training-form__check-list-item">
        <Checkbox
          label={getDurationName(TrainingDuration.Hi)}
          name={name}
          value={TrainingDuration.Hi}
          onChange={onChange}
          checked={hasDuration(TrainingDuration.Hi)}
          disabled={disabled}
        />
      </li>
      <li className="my-training-form__check-list-item">
        <Checkbox
          label={getDurationName(TrainingDuration.Extra)}
          name={name}
          value={TrainingDuration.Extra}
          onChange={onChange}
          checked={hasDuration(TrainingDuration.Extra)}
          disabled={disabled}
        />
      </li>
    </ul>
  );
};

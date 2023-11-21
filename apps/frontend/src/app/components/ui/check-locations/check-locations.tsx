import React, { ChangeEvent } from 'react';
import { Location } from '@fit-friends/shared';
import { Checkbox } from '../form/checkbox/checkbox';

interface CheckLocationsProps {
  name: string;
  locations: Location[];
  onChange?: (evt: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const CheckLocations: React.FC<CheckLocationsProps> = (props) => {
  const { name, locations, onChange, disabled } = props;
  const hasLocation = (location: Location) => locations.includes(location);

  return (
    <ul className="user-catalog-form__check-list">
      <li className="user-catalog-form__check-list-item">
        <Checkbox
          value={Location.Pionerskaya}
          name={name}
          label="Пионерская"
          onChange={onChange}
          checked={hasLocation(Location.Pionerskaya)}
          disabled={disabled}
        />
      </li>
      <li className="user-catalog-form__check-list-item">
        <Checkbox
          value={Location.Udelnaya}
          name={name}
          label="Удельная"
          onChange={onChange}
          checked={hasLocation(Location.Udelnaya)}
          disabled={disabled}
        />
      </li>
      <li className="user-catalog-form__check-list-item">
        <Checkbox
          value={Location.Zvezdnaya}
          name={name}
          label="Звездная"
          onChange={onChange}
          checked={hasLocation(Location.Zvezdnaya)}
          disabled={disabled}
        />
      </li>
      <li className="user-catalog-form__check-list-item">
        <Checkbox
          value={Location.Sportivnaya}
          name={name}
          label="Спортивная"
          onChange={onChange}
          checked={hasLocation(Location.Sportivnaya)}
          disabled={disabled}
        />
      </li>
    </ul>
  );
};

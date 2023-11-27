import clsx from 'clsx';
import { IUser } from '@fit-friends/shared';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../ui/form/input/input';
import { Textarea } from '../../ui/form/textarea/textarea';
import { Toggle } from '../../ui/form/toggle/toggle';
import { Select } from '../../ui/form/select/select';
import { gendersList, levelsList, locationsList } from '../../../constants/common';
import { userInfoSchema } from '../../../utils/validate-schemas';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateUserAction } from '../../../store/user/async-actions';
import { UserInfoType } from '../../../types/forms-type';
import { SpecializationGroup } from '../../ui/specialization-group/specialization-group';
import * as authSelector from '../../../store/auth/auth-select';

interface UserInfoProps {
  user: IUser;
  isEditable: boolean;
  setEditable: (value: boolean) => void;
  avatar?: FileList | null;
}

export const UserInfoForm: React.FC<UserInfoProps> = ({ user, isEditable, setEditable, avatar }) => {
  const isLoading = useAppSelector(authSelector.isLoading);
  const dispatch = useAppDispatch();
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const [level, setLevel] = useState('');

  const methods = useForm<UserInfoType>({
    defaultValues: user,
    resolver: yupResolver(userInfoSchema),
  });

  const {
    handleSubmit,
    formState: { errors }
  } = methods;

  useEffect(() => {
    setLocation(user.location);
    setGender(user.gender);
    setLevel(user.trainingLevel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleEditMode = () => {
    if (Object.keys(errors).length === 0) {
      setEditable(!isEditable);
    }
  };

  const onSubmit = (data: UserInfoType) => {
    toggleEditMode();
    console.log(data)
    dispatch(updateUserAction(data));
  };

  return (
    <FormProvider {...methods}>
      <form className={clsx(isEditable ? 'user-info-edit__form' : 'user-info__form')} onSubmit={handleSubmit(onSubmit)}>
        {isEditable || (Object.keys(errors).length !== 0) || isLoading ? (
          <button className="btn-flat btn-flat--underlined user-info-edit__save-button" type="submit" aria-label="Сохранить" disabled={isLoading}>
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#icon-edit" />
            </svg>
            <span>Сохранить</span>
          </button>
        ) : (
          <span className="btn-flat btn-flat--underlined user-info__edit-button" aria-label="Редактировать" onClick={toggleEditMode}>
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#icon-edit" />
            </svg>
            <span>Редактировать</span>
          </span>
        )}

        <div className="user-info-edit__section">
          <h2 className="user-info-edit__title">Обо мне</h2>
          <Input name="name" className="user-info-edit__input" disabled={!isEditable} />
          <Textarea label="Описание" name="bio" className="user-info-edit__textarea" disabled={!isEditable} />
        </div>

        <div className="user-info-edit__section user-info-edit__section--status">
          <h2 className="user-info-edit__title user-info-edit__title--status">Статус</h2>
          <Toggle name="personalTraining" label="Готов тренировать" className="user-info-edit__toggle" disabled={!isEditable} />
        </div>

        <div className="user-info-edit__section">
          <h2 className="user-info-edit__title user-info-edit__title--specialization">Специализация</h2>
          <SpecializationGroup className='user-info-edit__specialization' disabled={!isEditable}/>
        </div>

        <Select
          label='Локация'
          options={locationsList}
          name="location"
          selected={location}
          setSelected={setLocation}
          className='user-info-edit__select'
          disabled={!isEditable}
        />

        <Select
          label='Пол'
          options={gendersList}
          name="gender"
          selected={gender}
          setSelected={setGender}
          className='user-info-edit__select'
          disabled={!isEditable}
        />

        <Select
          label='Уровень'
          options={levelsList}
          name="trainingLevel"
          selected={level}
          setSelected={setLevel}
          className='user-info-edit__select'
          disabled={!isEditable}
        />
      </form>
    </FormProvider>
  );
};

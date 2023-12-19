import clsx from 'clsx';
import { IUser, Role } from '@fit-friends/shared';
import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../ui/form/input/input';
import { Textarea } from '../../ui/form/textarea/textarea';
import { Toggle } from '../../ui/form/toggle/toggle';
import { Select } from '../../ui/form/select/select';
import { LoadStatus, gendersList, levelsList, locationsList } from '../../../constants/common';
import { userInfoSchema } from '../../../utils/validate-schemas';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateUserAction } from '../../../store/user/async-actions';
import { UserInfoType } from '../../../types/forms-type';
import { SpecializationGroup } from '../../ui/specialization-group/specialization-group';
import * as authSelector from '../../../store/auth/auth-select';
import * as userSelector from '../../../store/user/user-select';
import { useServerFormError } from '../../../hooks/use-server-form-error';

interface UserInfoProps {
  user: IUser;
  isEditable: boolean;
  setEditable: (value: boolean) => void;
  avatar?: FileList | null;
  setAvatarError: (value: string) => void;
}

const getFieldUpdateUser = (user: IUser): UserInfoType => {
  const fields = {
    avatar: user.avatar,
    name: user.name,
    bio: user.bio!,
    trainingType: user.trainingType!,
    location: user.location,
    gender: user.gender,
    trainingLevel: user.trainingLevel!,
  };

  if (user.role === Role.User) {
    return { ...fields, ready: user.ready };
  }
  return { ...fields, personalTraining: user.personalTraining };
};

export const UserInfoForm: React.FC<UserInfoProps> = ({ user, isEditable, setEditable, avatar, setAvatarError }) => {
  const loadStatus = useAppSelector(authSelector.loadStatus);
  const dispatch = useAppDispatch();
  const userError = useAppSelector(userSelector.error);
  const [location, setLocation] = useState('');
  const [gender, setGender] = useState('');
  const [level, setLevel] = useState('');

  const isLoading = loadStatus === LoadStatus.Loading;

  const methods = useForm<UserInfoType>({
    defaultValues: useMemo(() => getFieldUpdateUser(user), [user]),
    resolver: yupResolver(userInfoSchema),
  });

  const {
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = methods;

  const isFormError = Object.keys(errors).length !== 0

  useEffect(() => {
      setAvatarError(errors['avatar']?.message as string ?? '');
  }, [errors, avatar, setAvatarError]);

  useEffect(() => {
    const avatarImg = avatar as FileList;
    avatarImg && setValue('avatar', avatar ? avatarImg : '');
  }, [avatar, setValue]);

  useEffect(() => {
    reset(getFieldUpdateUser(user));
    setLocation(user.location);
    setGender(user.gender);
    setLevel(user.trainingLevel!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useServerFormError<UserInfoType>(setError, userError);

  const toggleEditMode = () => {
    if (!isFormError) {
      setEditable(!isEditable);
    }
  };

  if(isFormError) {
    setEditable(true);
  }

  const onSubmit = (data: UserInfoType) => {
    setEditable(false);
    const fileAvatar = avatar?.[0];
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('bio', data.bio ?? '');
    formData.append('trainingType', data.trainingType.join(','));
    formData.append('location', data.location);
    formData.append('gender', data.gender);
    formData.append('trainingLevel', data.trainingLevel);

    if (user.role === Role.User) {
      formData.append('ready', `${data.ready}`);
    } else {
      formData.append('personalTraining', `${data.personalTraining}`);
    }

    if (fileAvatar) {
      formData.append('avatar', fileAvatar);
    }
    dispatch(updateUserAction(formData));
  };

  return (
    <FormProvider {...methods}>
      <form className={clsx(isEditable ? 'user-info-edit__form' : 'user-info__form')} onSubmit={handleSubmit(onSubmit)}>
        {isEditable || Object.keys(errors).length !== 0 || isLoading ? (
          <button className="btn-flat btn-flat--underlined user-info-edit__save-button" data-testid='user-edit-btn' type="submit" aria-label="Сохранить" disabled={isLoading}>
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#icon-edit" />
            </svg>
            <span>Сохранить</span>
          </button>
        ) : (
          <span className="btn-flat btn-flat--underlined user-info__edit-button" data-testid='set-edit-btn' aria-label="Редактировать" onClick={toggleEditMode}>
            <svg width="12" height="12" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#icon-edit" />
            </svg>
            <span>Редактировать</span>
          </span>
        )}

        <div className="user-info-edit__section">
          <h2 className="user-info-edit__title">Обо мне</h2>
          <Input name="name" className="user-info-edit__input" dataTestId='input-name-element' disabled={!isEditable} />
          <Textarea label="Описание" name="bio" className="user-info-edit__textarea" dataTestId='textarea-desc-element' disabled={!isEditable} />
        </div>

        <div className="user-info-edit__section user-info-edit__section--status">
          <h2 className="user-info-edit__title user-info-edit__title--status">Статус</h2>
          <Toggle
            name={`${user?.role === Role.User ? 'ready' : 'personalTraining'}`}
            label={`${user?.role === Role.User ? 'Готов к тренировке' : 'Готов тренировать'}`}
            className="user-info-edit__toggle"
            disabled={!isEditable}
            dataTestId='toggler-ready-checkbox'
          />
        </div>

        <div className="user-info-edit__section">
          <h2 className="user-info-edit__title user-info-edit__title--specialization">Специализация</h2>
          <SpecializationGroup className="user-info-edit__specialization" dataTestId='btn-checkbox-element' disabled={!isEditable} />
        </div>

        <Select
          label="Локация"
          options={locationsList}
          name="location"
          selected={location}
          setSelected={setLocation}
          className="user-info-edit__select"
          disabled={!isEditable}
          dataTestId='select-element'
        />

        <Select
          label="Пол"
          options={gendersList}
          name="gender"
          selected={gender}
          setSelected={setGender}
          className="user-info-edit__select"
          disabled={!isEditable}
          dataTestId='select-element'
        />

        <Select
          label="Уровень"
          options={levelsList}
          name="trainingLevel"
          selected={level}
          setSelected={setLevel}
          className="user-info-edit__select"
          disabled={!isEditable}
          dataTestId='select-element'
        />
      </form>
    </FormProvider>
  );
};

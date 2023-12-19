import React, { useState } from 'react';
import { Gender, Role } from '@fit-friends/shared';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../ui/form/input/input';
import { Select } from '../../ui/form/select/select';
import { InputRadio } from '../../ui/form/input-radio/input-radio';
import { RoleBtnRadio } from '../../ui/form/role-btn-radio/role-btn-radio';
import { InputAvatar } from '../../ui/form/input-avatar/input-avatar';
import { useImagePreview } from '../../../hooks/use-image-preview';
import { signupSchema } from '../../../utils/validate-schemas';
import { locationsList } from '../../../constants/common';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { signupAction } from '../../../store/auth/async-actions';
import { Button } from '../../ui/button/button';
import { SignupType } from '../../../types/forms-type';
import { Loader } from '../../loader/loader';
import { useServerFormError } from '../../../hooks/use-server-form-error';
import * as authSelector from '../../../store/auth/auth-select';

export const SignupForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const authError = useAppSelector(authSelector.error);
  const [agree, setAgree] = useState(false);
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<SignupType>({
    defaultValues: { gender: Gender.Male, role: Role.Coach },
    resolver: yupResolver(signupSchema),
  });

  const { setError, reset } = methods;

  const fileImage = methods.watch('avatar');
  const { previewImage, resetImage } = useImagePreview(fileImage as FileList);
  const { formError } = useServerFormError<SignupType>(setError, authError);

  const onSubmit = (data: SignupType) => {
    setIsLoading(true);
    const birthday = data.birthday?.split('-').reverse().join('-');

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('birthday', birthday ?? '');
    formData.append('gender', data.gender);
    formData.append('location', data.location);
    formData.append('role', data.role);

    if (data.avatar instanceof FileList && data.avatar[0]) {
      formData.append('avatar', data.avatar[0]);
    }

    dispatch(signupAction(formData))
      .unwrap()
      .then(() => {
        reset();
        setLocation('');
        resetImage();
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} data-testid='signup-form'>
        {isLoading && <Loader />}

        <div className="sign-up">
          {formError && <i className="form-message-error">{formError}</i>}
          <div className="sign-up__load-photo">
            <InputAvatar name="avatar" previewImage={previewImage} accept="image/png, image/jpeg" dataTestId='input-avatar-element' />
            <div className="sign-up__description">
              <h2 className="sign-up__legend">Загрузите фото профиля</h2>
              <span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
            </div>
          </div>
          <div className="sign-up__data">
            <Input label="Имя" name="name" type="text" dataTestId='input-name-element'/>
            <Input label="E-mail" name="email" type="text" dataTestId='input-email-element' />
            <Input label="Дата рождения" name="birthday" type="date" dataTestId='input-birthday-element' />
            <Select
              options={locationsList}
              name="location"
              label="Ваша локация"
              placeholder="Выберите локацию"
              selected={location}
              setSelected={setLocation}
              dataTestId='select-location-element'
            />
            <Input label="Пароль" name="password" type="password" dataTestId='input-password-element' />

            <div className="sign-up__radio">
              <span className="sign-up__label">Пол</span>
              <div className="custom-toggle-radio custom-toggle-radio--big">
                <InputRadio name="gender" value={Gender.Male} label="Мужской" dataTestId='radio-gender-male' />
                <InputRadio name="gender" value={Gender.Female} label="Женский" dataTestId='radio-gender-female' />
                <InputRadio name="gender" value={Gender.AnyGender} label="Неважно" dataTestId='radio-gender-any' />
              </div>
            </div>
          </div>

          <div className="sign-up__role">
            <h2 className="sign-up__legend">Выберите роль</h2>
            <div className="role-selector sign-up__role-selector">
              <RoleBtnRadio role={Role.Coach} dataTestId='radio-coach-role' />
              <RoleBtnRadio role={Role.User} dataTestId='radio-user-role' />
            </div>
          </div>

          <div className="sign-up__checkbox">
            <label>
              <input type="checkbox" value="user-agreement" name="user-agreement" defaultChecked={agree} onClick={() => setAgree(!agree)} data-testid='checkbox-agreement' />
              <span className="sign-up__checkbox-icon">
                <svg width="9" height="6" aria-hidden="true">
                  <use xlinkHref="/assets/img/sprite.svg#arrow-check" />
                </svg>
              </span>
              <span className="sign-up__checkbox-label">
                Я соглашаюсь с <span>политикой конфиденциальности</span> компании
              </span>
            </label>
          </div>

          <Button text="Продолжить" className="sign-up__button" type="submit" disabled={!agree || isLoading} dataTestId='button-submit-element' />
        </div>
      </form>
    </FormProvider>
  );
};

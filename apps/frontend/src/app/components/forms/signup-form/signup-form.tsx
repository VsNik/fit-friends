import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gender, Location, Role } from '@fit-friends/shared';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Input } from '../../ui/form/input/input';
import { Select } from '../../ui/form/select/select';
import { InputRadio } from '../../ui/form/input-radio/input-radio';
import { RoleBtnRadio } from '../../ui/form/role-btn-radio/role-btn-radio';
import { InputAvatar } from '../../ui/form/input-avatar/input-avatar';
import { useImagePreview } from '../../../hooks/use-image-preview';
import { signupSchema } from '../../../utils/validate-schemas';
import { RouteName } from '../../../app';

const optionsList = [
  { value: Location.Pionerskaya, label: 'Пионерская' },
  { value: Location.Udelnaya, label: 'Удельная' },
  { value: Location.Zvezdnaya, label: 'Звездная' },
  { value: Location.Sportivnaya, label: 'Спортивная' },
];

type SignupType = Yup.InferType<typeof signupSchema>;

export interface ISignupData {
  avatar: string | FileList;
  email: string;
  birthday: string;
  gender: Gender;
  location: Location;
  name: string
  password: string;
  role: Role;
}

export const SignupForm: React.FC = () => {
  const navigation = useNavigate();
  const [agree, setAgree] = useState(false);
  const [location, setLocation] = useState('');

  const methods = useForm<SignupType>({
    defaultValues: { gender: Gender.Male, role: Role.Coach },
    resolver: yupResolver(signupSchema),
  });
  
  const fileImage = methods.watch('avatar');
  const {previewImage, resetImage} = useImagePreview(fileImage as FileList);

  const resetForm = () => {
    methods.reset();
    setLocation('');
    resetImage();
  };

  const onSubmit = (data: SignupType) => {
    const birthday = data.birthday?.split('-').reverse().join('-');
    const avatar = data.avatar instanceof FileList && data.avatar[0];

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

    console.log(formData);
    console.log({ ...data, avatar, birthday });
    resetForm();

    if (data.role === Role.User) {
      return navigation(RouteName.QuestionUser);
    }
    return navigation(RouteName.QuestionCoach);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="sign-up">
          <div className="sign-up__load-photo">
            <InputAvatar name='avatar' previewImage={previewImage} accept='image/png, image/jpeg'/>
            <div className="sign-up__description">
              <h2 className="sign-up__legend">Загрузите фото профиля</h2>
              <span className="sign-up__text">JPG, PNG, оптимальный размер 100&times;100&nbsp;px</span>
            </div>
          </div>
          <div className="sign-up__data">
            <Input label="Имя" name="name" type="text" />
            <Input label="E-mail" name="email" type="email" />
            <Input label="Дата рождения" name="birthday" type="date" />
            <Select 
              options={optionsList}
              name="location"
              label='Ваша локация'
              placeholder="Выберите локацию"
              selected={location}
              setSelected={setLocation}
            />
            <Input label="Пароль" name="password" type="password" />

            <div className="sign-up__radio">
              <span className="sign-up__label">Пол</span>
              <div className="custom-toggle-radio custom-toggle-radio--big">
                <InputRadio name="gender" value={Gender.Male} label="Мужской"/>
                <InputRadio name="gender" value={Gender.Female} label="Женский"/>
                <InputRadio name="gender" value={Gender.AnyGender} label="Неважно"/>
              </div>
            </div>
          </div>

          <div className="sign-up__role">
            <h2 className="sign-up__legend">Выберите роль</h2>
            <div className="role-selector sign-up__role-selector">
              <RoleBtnRadio role={Role.Coach}/>
              <RoleBtnRadio role={Role.User}/>
            </div>
          </div>

          <div className="sign-up__checkbox">
            <label>
              <input 
                type="checkbox" 
                value="user-agreement" 
                name="user-agreement" 
                defaultChecked={agree}
                onClick={() => setAgree(!agree)}
              />
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

          <button disabled={!agree} className="btn sign-up__button" type="submit">
            Продолжить
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../ui/form/input/input';
import { loginSchema } from '../../../utils/validate-schemas';
import { LoginType } from '../../../types/forms-type';
import { Button } from '../../ui/button/button';

export const LoginForm: React.FC = () => {
  const methods = useForm<LoginType>({
    resolver: yupResolver(loginSchema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = (data: LoginType) => {
    console.log(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="sign-in">
          <Input className="sign-in__input" label="E-mail" name="email" type="email" />
          <Input className="sign-in__input" label="Пароль" name="password" type="password" />

          <Button text='Продолжить' className='sign-in__button' type="submit" />
        </div>
      </form>
    </FormProvider>
  );
};

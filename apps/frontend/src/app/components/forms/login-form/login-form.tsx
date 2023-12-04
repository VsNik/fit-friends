import React, { useEffect, useState } from 'react';
import { FieldPath, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../ui/form/input/input';
import { loginSchema } from '../../../utils/validate-schemas';
import { LoginType } from '../../../types/forms-type';
import { Button } from '../../ui/button/button';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { loginAction } from '../../../store/auth/async-actions';
import { Loader } from '../../loader/loader';
import * as authSelector from '../../../store/auth/auth-select';

type LoginFieldError = FieldPath<LoginType>;

export const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const authError = useAppSelector(authSelector.error);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<LoginType>({
    resolver: yupResolver(loginSchema),
  });

  const { handleSubmit, reset, setError } = methods;

  useEffect(() => {
    if (authError && authError.message instanceof Array) {
      authError.message.forEach((err) => {
        setError(err.field as LoginFieldError, {message: err.error});
      });
    }    
  }, [authError, setError]);

  const onSubmit = (data: LoginType) => {
    setIsLoading(true);
    dispatch(loginAction(data))
      .unwrap()
      .then(() => {
        reset();
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false))
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isLoading && <Loader />}
        <div className="sign-in">
          <Input className="sign-in__input" label="E-mail" name="email" type="email" />
          <Input className="sign-in__input" label="Пароль" name="password" type="password" />

          <Button text="Продолжить" className="sign-in__button" type="submit" disabled={isLoading} />
        </div>
      </form>
    </FormProvider>
  );
};

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TrainingDuration, TrainingLevel, TrainingType } from '@fit-friends/shared';
import { Input } from '../../ui/form/input/input';
import { questionUserSchema } from '../../../utils/validate-schemas';
import { QuestionUserType } from '../../../types/forms-type';
import { DurationGroup } from '../../ui/duration-group/duration-group';
import { SpecializationGroup } from '../../ui/specialization-group/specialization-group';
import { LevelGroup } from '../../ui/level-group/level-group';
import { Button } from '../../ui/button/button';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { createUserAction } from '../../../store/auth/async-actions';
import { Loader } from '../../loader/loader';
import { useServerFormError } from '../../../hooks/use-server-form-error';
import * as authSelector from '../../../store/auth/auth-select';

export const QuestionUserForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const authError = useAppSelector(authSelector.error);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<QuestionUserType>({
    defaultValues: {
      trainingType: [TrainingType.Boxing, TrainingType.Power],
      trainingDuration: TrainingDuration.Low,
      trainingLevel: TrainingLevel.Novice,
    },
    resolver: yupResolver(questionUserSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
    setError
  } = methods;

  const {formError} = useServerFormError<QuestionUserType>(setError, authError);

  const onSubmit = (data: QuestionUserType) => {
    setIsLoading(true);
    dispatch(createUserAction({...data, ready: true}))
      .unwrap()
      .then(() => {
        reset();
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} data-testid='user-question-form'>
        {isLoading && <Loader />}
        <div className="questionnaire-user">
          {formError && <i className='form-message-error'>{formError}</i>}
          <h1 className="visually-hidden">Опросник</h1>
          <div className="questionnaire-user__wrapper">
            <div className="questionnaire-user__block">
              <span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
              <SpecializationGroup className="questionnaire-user__specializations" dataTestId='checkbox-specialization' />
            </div>

            <div className="questionnaire-user__block">
              <span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
              <DurationGroup className="custom-toggle-radio--big questionnaire-user__radio" dataTestId='radio-duration-group' />
            </div>

            <div className="questionnaire-user__block">
              <span className="questionnaire-user__legend">Ваш уровень</span>
              <LevelGroup className="custom-toggle-radio--big questionnaire-user__radio" dataTestId='radio-level-group' />
            </div>

            <div className="questionnaire-user__block">
              <div className="questionnaire-user__calories-lose">
                <span className="questionnaire-user__legend">Сколько калорий хотите сбросить</span>
                <Input
                  type="number"
                  name="loseCalories"
                  className="custom-input--with-text-right questionnaire-user__input"
                  text="ккал"
                  isErrorMessage={false}
                  dataTestId='input-lose-calory'
                />
                {errors['loseCalories'] && (
                  <i className="custom-input__error" style={{ bottom: '-5px' }}>
                    {errors['loseCalories']?.message as string}
                  </i>
                )}
              </div>
              <div className="questionnaire-user__calories-waste">
                <span className="questionnaire-user__legend">Сколько калорий тратить в день</span>
                <Input
                  type="number"
                  name="burnCalories"
                  className="custom-input--with-text-right questionnaire-user__input"
                  text="ккал"
                  isErrorMessage={false}
                  dataTestId='input-burn-calory'
                />
                {errors['burnCalories'] && (
                  <i className="custom-input__error" style={{ bottom: '-5px' }}>
                    {errors['burnCalories']?.message as string}
                  </i>
                )}
              </div>
            </div>
          </div>

          <Button text='Продолжить' className='questionnaire-user__button' dataTestId='button-submit-element' type="submit" disabled={isLoading} />
        </div>
      </form>
    </FormProvider>
  );
};

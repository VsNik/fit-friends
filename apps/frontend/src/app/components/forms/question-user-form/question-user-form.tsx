import React from 'react';
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

export const QuestionUserForm: React.FC = () => {
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
    formState: { errors },
  } = methods;

  const onSubmit = (data: QuestionUserType) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="questionnaire-user">
          <h1 className="visually-hidden">Опросник</h1>
          <div className="questionnaire-user__wrapper">
            <div className="questionnaire-user__block">
              <span className="questionnaire-user__legend">Ваша специализация (тип) тренировок</span>
              <SpecializationGroup className="questionnaire-user__specializations" />
            </div>

            <div className="questionnaire-user__block">
              <span className="questionnaire-user__legend">Сколько времени вы готовы уделять на тренировку в день</span>
              <DurationGroup className="custom-toggle-radio--big questionnaire-user__radio" />
            </div>

            <div className="questionnaire-user__block">
              <span className="questionnaire-user__legend">Ваш уровень</span>
              <LevelGroup className="custom-toggle-radio--big questionnaire-user__radio" />
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
                />
                {errors['burnCalories'] && (
                  <i className="custom-input__error" style={{ bottom: '-5px' }}>
                    {errors['burnCalories']?.message as string}
                  </i>
                )}
              </div>
            </div>
          </div>

          <Button text='Продолжить' className='questionnaire-user__button'  type="submit" />
        </div>
      </form>
    </FormProvider>
  );
};

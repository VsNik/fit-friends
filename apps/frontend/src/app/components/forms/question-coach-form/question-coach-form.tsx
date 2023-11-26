import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TrainingLevel, TrainingType } from '@fit-friends/shared';
import { InputFile } from '../../ui/form/input-file/input-file';
import { Textarea } from '../../ui/form/textarea/textarea';
import { questionCoachSchema } from '../../../utils/validate-schemas';
import { QuestionCoachType } from '../../../types/forms-type';
import { SpecializationGroup } from '../../ui/specialization-group/specialization-group';
import { LevelGroup } from '../../ui/level-group/level-group';
import { Button } from '../../ui/button/button';

export const QuestionCoachForm: React.FC = () => {
  const methods = useForm<QuestionCoachType>({
    defaultValues: { 
        trainingType: [TrainingType.Power, TrainingType.Boxing],
        trainingLevel: TrainingLevel.Novice,
    },
    resolver: yupResolver(questionCoachSchema),
    mode: 'all',
  });
  const { handleSubmit } = methods;

  const onSubmit = (data: QuestionCoachType) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="questionnaire-coach">
          <h1 className="visually-hidden">Опросник</h1>
          <div className="questionnaire-coach__wrapper">
            <div className="questionnaire-coach__block">
              <span className="questionnaire-coach__legend">Ваша специализация (тип) тренировок</span>
              <SpecializationGroup className="questionnaire-coach__specializations" />
            </div>

            <div className="questionnaire-coach__block">
              <span className="questionnaire-coach__legend">Ваш уровень</span>
              <LevelGroup className="custom-toggle-radio--big questionnaire-coach__radio" />
            </div>

            <div className="questionnaire-coach__block">
              <span className="questionnaire-coach__legend">Ваши дипломы и сертификаты</span>
              <InputFile name="certificate" accept=".pdf, .jpg, .png" />
            </div>

            <div className="questionnaire-coach__block">
              <span className="questionnaire-coach__legend">Расскажите о своём опыте, который мы сможем проверить</span>
              <Textarea name="merits" className="questionnaire-coach__textarea" />

              <div className="questionnaire-coach__checkbox">
                <label>
                  <input {...methods.register('personalTraining')} type="checkbox" />
                  <span className="questionnaire-coach__checkbox-icon">
                    <svg width="9" height="6" aria-hidden="true">
                      <use xlinkHref="/assets/img/sprite.svg#arrow-check" />
                    </svg>
                  </span>
                  <span className="questionnaire-coach__checkbox-label">Хочу дополнительно индивидуально тренировать</span>
                </label>
              </div>
            </div>
          </div>

          <Button text='Продолжить' className='questionnaire-coach__button' type="submit" />
        </div>
      </form>
    </FormProvider>
  );
};

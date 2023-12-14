import React, { useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { createCoachAction } from '../../../store/auth/async-actions';
import { useServerFormError } from '../../../hooks/use-server-form-error';
import * as authSelector from '../../../store/auth/auth-select';

export const QuestionCoachForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const authError = useAppSelector(authSelector.error);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm<QuestionCoachType>({
    defaultValues: { 
        trainingType: [TrainingType.Power, TrainingType.Boxing],
        trainingLevel: TrainingLevel.Novice,
    },
    resolver: yupResolver(questionCoachSchema),
    mode: 'all',
  });
  
  const { handleSubmit, reset, setError } = methods;
  const {formError} = useServerFormError<QuestionCoachType>(setError, authError);

  const onSubmit = (data: QuestionCoachType) => {
    setIsLoading(true);
    const fileList = data.certificate as FileList;

    const formData = new FormData();
    formData.append('trainingType', data.trainingType.toString());
    formData.append('trainingLevel', data.trainingLevel);
    formData.append('merits', data.merits);
    formData.append('personalTraining', `${data.personalTraining}`);
    formData.append('certificate', fileList[0]);
    dispatch(createCoachAction(formData))
      .unwrap()
      .then(() => {
        reset();
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} data-testid='coach-question-form' >
        <div className="questionnaire-coach">
          {formError && <i className='form-message-error'>{formError}</i>}
          <h1 className="visually-hidden">Опросник</h1>
          <div className="questionnaire-coach__wrapper">
            <div className="questionnaire-coach__block">
              <span className="questionnaire-coach__legend">Ваша специализация (тип) тренировок</span>
              <SpecializationGroup className="questionnaire-coach__specializations" dataTestId='checkbox-specialization' />
            </div>

            <div className="questionnaire-coach__block">
              <span className="questionnaire-coach__legend">Ваш уровень</span>
              <LevelGroup className="custom-toggle-radio--big questionnaire-coach__radio" dataTestId='radio-level-group'/>
            </div>

            <div className="questionnaire-coach__block">
              <span className="questionnaire-coach__legend">Ваши дипломы и сертификаты</span>
              <InputFile name="certificate" accept=".pdf" placeholder='Загрузите сюда файлы формата PDF' dataTestId='input-certificate-element' />
            </div>

            <div className="questionnaire-coach__block">
              <span className="questionnaire-coach__legend">Расскажите о своём опыте, который мы сможем проверить</span>
              <Textarea name="merits" className="questionnaire-coach__textarea" dataTestId='textarea-desc-element' />

              <div className="questionnaire-coach__checkbox">
                <label>
                  <input {...methods.register('personalTraining')} type="checkbox" data-testid='checkbox-ready-element'/>
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

          <Button text='Продолжить' className='questionnaire-coach__button' dataTestId='button-submit-element' type="submit" disabled={isLoading} />
        </div>
      </form>
    </FormProvider>
  );
};

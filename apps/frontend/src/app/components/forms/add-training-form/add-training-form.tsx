import React, { useState } from 'react';
import { Gender } from '@fit-friends/shared';
import { FormProvider, useForm } from 'react-hook-form';
import { Input } from '../../ui/form/input/input';
import { Select } from '../../ui/form/select/select';
import { durationsList, levelsList, trainingsList } from '../../../constants/common';
import { Button } from '../../ui/button/button';
import { InputRadio } from '../../ui/form/input-radio/input-radio';
import { Textarea } from '../../ui/form/textarea/textarea';
import { InputFile } from '../../ui/form/input-file/input-file';
import { yupResolver } from '@hookform/resolvers/yup';
import { trainingSchema } from '../../../utils/validate-schemas';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { createTrainingAction } from '../../../store/training/async-actions';
import { Loader } from '../../loader/loader';
import { AddTrainingType } from '../../../types/forms-type';
import { useServerFormError } from '../../../hooks/use-server-form-error';
import * as trainingSelector from '../../../store/training/training-select';

export const AddTrainingForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const trainingErrors = useAppSelector(trainingSelector.error)
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [level, setLevel] = useState('');

  const methods = useForm<AddTrainingType>({
    defaultValues: { gender: Gender.AnyGender, isSpecial: false },
    resolver: yupResolver(trainingSchema),
  });

  const { handleSubmit, reset, setError } = methods;
  const {formError} = useServerFormError<AddTrainingType>(setError, trainingErrors);

  const resetForm = () => {
    setType('');
    setDuration('');
    setLevel('');
    reset();
  }

  const onSubmit = (data: AddTrainingType) => {
    setIsLoading(true);
    const video = data.video as FileList;

    const formData = new FormData();
    formData.append('video', video[0]);
    formData.append('title', data.title);
    formData.append('type', data.type);
    formData.append('calories', String(data.calories));
    formData.append('duration', data.duration);
    formData.append('price', String(data.price));
    formData.append('level', data.level);
    formData.append('gender', data.gender);
    formData.append('description', data.description);
    formData.append('isSpecial', `${data.isSpecial}`);

    dispatch(createTrainingAction(formData))
      .unwrap()
      .then(() => {
        resetForm();
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {isLoading && <Loader />}
        <div className="create-training">
          {formError && <i className='form-message-error'>{formError}</i>}
          <div className="create-training__wrapper">
            <div className="create-training__block">
              <h2 className="create-training__legend">Название тренировки</h2>
              <Input name="title" className="create-training__input" />
            </div>
            <div className="create-training__block">
              <h2 className="create-training__legend">Характеристики тренировки</h2>
              <div className="create-training__info">
                <Select name="type" options={trainingsList} label="Выберите тип тренировки" selected={type} setSelected={setType}/>
                <Input name="calories" className="custom-input--with-text-right" text="ккал" label="Сколько калорий потратим" type="number"/>
                <Select
                  name="duration"
                  options={durationsList}
                  label="Сколько времени потратим"
                  selected={duration}
                  setSelected={setDuration}
                  disabled={isLoading}
                />
                <Input name="price" className="custom-input--with-text-right" text="₽" label="Стоимость тренировки" type="number"/>
                <Select name="level" options={levelsList} label="Выберите уровень тренировки" selected={level} setSelected={setLevel}/>

                <div className="create-training__radio-wrapper">
                  <span className="create-training__label">Кому подойдет тренировка</span>
                  <br />
                  <div className="custom-toggle-radio create-training__radio">
                    <InputRadio name="gender" value={Gender.Male} label="Мужской"/>
                    <InputRadio name="gender" value={Gender.Female} label="Женский"/>
                    <InputRadio name="gender" value={Gender.AnyGender} label="Неважно"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="create-training__block">
              <h2 className="create-training__legend">Описание тренировки</h2>
              <Textarea name="description"/>
            </div>

            <div className="create-training__block">
              <h2 className="create-training__legend">Загрузите видео-тренировку</h2>
              <InputFile name="video" accept=".mov, .avi, .mp4"/>
            </div>
          </div>

          <Button text="Опубликовать" className="create-training__button" type="submit" disabled={isLoading} />
        </div>
      </form>
    </FormProvider>
  );
};

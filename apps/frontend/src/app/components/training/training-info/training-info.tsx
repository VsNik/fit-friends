import React from 'react';
import { ButtonFloat } from '../../ui/button-float/button-float';
import { TrainingUserInfo } from '../training-user-info/training-user-info';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TrainingInput } from '../training-input/training-input';
import { TrainingRating } from '../training-rating/training-rating';
import { TrainingTextarea } from '../training-textarea/training-textarea';
import { Hashtag } from '../../ui/hashtag/hashtag';
import { getFakeTrainings } from '../../../fake-data/fake-training';

const updateTrainingSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  price: Yup.number().required()
})

type UpdateTrainingType = Yup.InferType<typeof updateTrainingSchema>;

interface TrainingInfoProps {
  onChangeMode: (value: boolean) => void;
}

export const TrainingInfo: React.FC<TrainingInfoProps> = ({onChangeMode}) => {
  const training = (getFakeTrainings(1)).data[0];

  const methods = useForm<UpdateTrainingType>({
    defaultValues: training,
    resolver: yupResolver(updateTrainingSchema),
  });

  const {handleSubmit} = methods;

  const onSubmit = (data: UpdateTrainingType) => {
    console.log(data);
  }

  return (
    <div className="training-info">
      <h2 className="visually-hidden">Информация о тренировке</h2>
      <div className="training-info__header">
        <TrainingUserInfo />

        <ButtonFloat 
          text="Редактировать" 
          icon="icon-edit" 
          type="button" 
          className="training-info__edit training-info__edit--edit" 
          onClick={() => onChangeMode(true)}
          light 
        />
        <ButtonFloat 
          text="Сохранить" 
          icon="icon-edit" 
          type="submit" 
          className="training-info__edit training-info__edit--save" 
          light 
          underline 
          form='training-info-form' 
          onClick={() => onChangeMode(false)}
        />
      </div>
      <div className="training-info__main-content">
        <FormProvider {...methods}>
          <form id='training-info-form' onSubmit={handleSubmit(onSubmit)}>
            <div className="training-info__form-wrapper">
              <div className="training-info__info-wrapper">
                <TrainingInput name="title" defaultValue="energy" className="training-info__input--training" />
                <TrainingTextarea
                  name="description"
                  label="Описание тренировки"
                  text="Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и&nbsp;координацию."
                />
              </div>
              <div className="training-info__rating-wrapper">
                <TrainingRating value={4} />

                <ul className="training-info__list">
                  <li className="training-info__item">
                    <Hashtag title={training.type} white />
                  </li>
                  <li className="training-info__item">
                    <Hashtag title={training.gender} white />
                  </li>
                  <li className="training-info__item">
                    <Hashtag title={`${training.calories} кал`} white />
                  </li>
                  <li className="training-info__item">
                    <Hashtag title={training.duration} white />
                  </li>
                </ul>
              </div>
              <div className="training-info__price-wrapper">
                <TrainingInput name="price" label="Стоимость" className="training-info__input--price" pricing />
                <ButtonFloat text="Сделать скидку 10%" icon="icon-discount" className="training-info__discount" light underline />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ITraining, Role } from '@fit-friends/shared';
import { ButtonFloat } from '../../ui/button-float/button-float';
import { TrainingUserInfo } from '../training-user-info/training-user-info';
import { useForm, FormProvider } from 'react-hook-form';
import { TrainingInput } from '../training-input/training-input';
import { TrainingRating } from '../training-rating/training-rating';
import { TrainingTextarea } from '../training-textarea/training-textarea';
import { Hashtag } from '../../ui/hashtag/hashtag';
import { Button } from '../../ui/button/button';

const updateTrainingSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  price: Yup.number().required(),
});

type UpdateTrainingType = Yup.InferType<typeof updateTrainingSchema>;

interface TrainingInfoProps {
  training: ITraining;
  role: Role;
  isEditable: boolean;
  onChangeMode: (value: boolean) => void;
}

export const TrainingInfo: React.FC<TrainingInfoProps> = ({ training, role, isEditable, onChangeMode }) => {
  const methods = useForm<UpdateTrainingType>({
    defaultValues: training,
    resolver: yupResolver(updateTrainingSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: UpdateTrainingType) => {
    console.log(data);
    onChangeMode(false);
  };

  return (
    <div className="training-info">
      <h2 className="visually-hidden">Информация о тренировке</h2>
      <div className="training-info__header">
        <TrainingUserInfo />

        {role === Role.Coach && (
          <>
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
              form="training-info-form"
            />
          </>
        )}
      </div>
      <div className="training-info__main-content">
        <FormProvider {...methods}>
          <form id="training-info-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="training-info__form-wrapper">
              <div className="training-info__info-wrapper">
                <TrainingInput name="title" className="training-info__input--training" disabled={!isEditable} />
                <TrainingTextarea name="description" label="Описание тренировки" disabled={!isEditable} />
              </div>
              <div className="training-info__rating-wrapper">
                <TrainingRating disabled={!isEditable} />

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
                <TrainingInput name="price" label="Стоимость" className="training-info__input--price" disabled={!isEditable} />
                {role === Role.User ? (
                  <Button text="Купить" className="training-info__buy" disabled />
                ) : (
                  <ButtonFloat text="Сделать скидку 10%" icon="icon-discount" type='button' className="training-info__discount" light underline />
                )}
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

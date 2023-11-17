import React from 'react';
import { ButtonFloat } from '../../ui/button-float/button-float';
import { TrainingUserInfo } from '../training-user-info/training-user-info';
import { useForm, FormProvider } from 'react-hook-form';
import { TrainingInput } from '../training-input/training-input';
import { TrainingRating } from '../training-rating/training-rating';
import { TrainingTextarea } from '../training-textarea/training-textarea';
import { Hashtag } from '../../ui/hashtag/hashtag';

export const TrainingInfo: React.FC = () => {
  const methods = useForm();

  return (
    <div className="training-info">
      <h2 className="visually-hidden">Информация о тренировке</h2>
      <div className="training-info__header">
        <TrainingUserInfo />

        <ButtonFloat text="Редактировать" icon="icon-edit" type="button" className="training-info__edit training-info__edit--edit" light />
        <ButtonFloat text="Сохранить" icon="icon-edit" type="button" className="training-info__edit training-info__edit--save" light underline />
      </div>
      <div className="training-info__main-content">
        <FormProvider {...methods}>
          <form action="#" method="get">
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
                    <Hashtag title="пилатес" white />
                  </li>
                  <li className="training-info__item">
                    <Hashtag title="для_всех" white />
                  </li>
                  <li className="training-info__item">
                    <Hashtag title="320ккал" white />
                  </li>
                  <li className="training-info__item">
                    <Hashtag title="30_50минут" white />
                  </li>
                </ul>
              </div>
              <div className="training-info__price-wrapper">
                <TrainingInput name="price" label="Стоимость" defaultValue="800 ₽" className="training-info__input--price" />
                <ButtonFloat text="Сделать скидку 10%" icon="icon-discount" className="training-info__discount" light underline />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

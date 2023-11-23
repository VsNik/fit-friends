import React, { ChangeEvent, useState } from 'react';
import { ITraining, OrderType, PaymentType } from '@fit-friends/shared';
import { PopupHeader } from '../popup-header/popup-header';
import { Image } from '../../ui/image/image';
import { ButtonRadioImage } from '../../ui/button-radio-image/button-radio-image';
import { Button } from '../../ui/button/button';
import { CreatedOrderType } from '../../../types/common';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import * as orderSelector from '../../../store/order/order-select';
import { createOrderAction } from '../../../store/order/async-action';

interface ByTrainingPopupProps {
  title: string;
  training: ITraining;
  onClose: () => void;
}

export const BuyPopup: React.FC<ByTrainingPopupProps> = (props) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(orderSelector.isLoading);
  const { onClose, training, title } = props;
  const [count, setCount] = useState<number>(0);
  const [paymentType, setPaymentType] = useState<PaymentType>(PaymentType.Visa);
  const totalPrice = training.price * count;

  const onSubmit = () => {
    const order: CreatedOrderType = {
      type: OrderType.Abonement,
      training: training.id,
      count,
      paymentType,
    };
    dispatch(createOrderAction(order));
    setCount(0);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleChangePaymentType = (evt: ChangeEvent<HTMLInputElement>) => {
    const type = evt.target.value as PaymentType;
    setPaymentType(type);
  };

  return (
    <section className="popup">
      <div className="modal__overlay" onClick={onClose} />
      <div className="popup__wrapper">
        <PopupHeader onClose={onClose} title={title} />

        <div className="popup__content popup__content--purchases">
          <div className="popup__product">
            <Image src={training.bgImage} className="popup__product-image" width={98} height={80} />

            <div className="popup__product-info">
              <h3 className="popup__product-title">{training.title}</h3>
              <p className="popup__product-price">{training.price} ₽</p>
            </div>
            <div className="popup__product-quantity">
              <p className="popup__quantity">Количество</p>
              <div className="input-quantity">
                <button className="btn-icon btn-icon--quantity" type="button" aria-label="minus" onClick={handleDecrement} disabled={count === 0 || isLoading}>
                  <svg width="12" height="12" aria-hidden="true">
                    <use xlinkHref="/assets/img/sprite.svg#icon-minus" />
                  </svg>
                </button>
                <div className="input-quantity__input">
                  <label>
                    <input type="text" value={count} size={2} readOnly />
                  </label>
                </div>
                <button className="btn-icon btn-icon--quantity" type="button" aria-label="plus" onClick={handleIncrement} disabled={isLoading}>
                  <svg width="12" height="12" aria-hidden="true">
                    <use xlinkHref="/assets/img/sprite.svg#icon-plus" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <section className="payment-method">
            <h4 className="payment-method__title">Выберите способ оплаты</h4>
            <ul className="payment-method__list">
              <li className="payment-method__item">
                <ButtonRadioImage
                  image="visa-logo"
                  name="paymentType"
                  value={PaymentType.Visa}
                  onChange={handleChangePaymentType}
                  checked={paymentType === PaymentType.Visa}
                  disabled={totalPrice === 0 || isLoading}
                />
              </li>
              <li className="payment-method__item">
                <ButtonRadioImage
                  image="mir-logo"
                  name="paymentType"
                  value={PaymentType.Mir}
                  onChange={handleChangePaymentType}
                  checked={paymentType === PaymentType.Mir}
                  disabled={totalPrice === 0 || isLoading}
                />
              </li>
              <li className="payment-method__item">
                <ButtonRadioImage
                  image="iomoney-logo"
                  name="paymentType"
                  value={PaymentType.Umoney}
                  onChange={handleChangePaymentType}
                  checked={paymentType === PaymentType.Umoney}
                  disabled={totalPrice === 0 || isLoading}
                />
              </li>
            </ul>
          </section>
          <div className="popup__total">
            <p className="popup__total-text">Итого</p>
            <svg className="popup__total-dash" width="310" height="2" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#dash-line" />
            </svg>
            <p className="popup__total-price">{totalPrice}&nbsp;₽</p>
          </div>
          <div className="popup__button">
            <Button text="Купить" onClick={() => onSubmit()} disabled={count === 0 || isLoading} />
          </div>
        </div>
      </div>
    </section>
  );
};

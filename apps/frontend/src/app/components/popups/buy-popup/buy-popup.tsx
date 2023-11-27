import React, { ChangeEvent, useState } from 'react';
import { ITraining, OrderType, PaymentType } from '@fit-friends/shared';
import FocusLock from 'react-focus-lock';
import { PopupHeader } from '../popup-header/popup-header';
import { Image } from '../../ui/image/image';
import { Button } from '../../ui/button/button';
import { CreatedOrderType } from '../../../types/common';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { createOrderAction } from '../../../store/order/async-action';
import * as orderSelector from '../../../store/order/order-select';
import { Loader } from '../../loader/loader';
import { CheckPayment } from '../../ui/check-payment/check-payment';
import { CheckCount } from '../../ui/check-count/check-count';
import { toNumberInputTextValue } from '../../../utils/helpers';

const MAX_COUNT = 99;

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

  const closePopup = () => {
    setCount(0);
    onClose();
  };

  const onSubmit = () => {
    const order: CreatedOrderType = {
      type: OrderType.Abonement,
      training: training.id,
      count,
      paymentType,
    };
    dispatch(createOrderAction(order)).then(closePopup);
  };

  const handleInputCount = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = toNumberInputTextValue(evt.target.value);
    setCount(value > MAX_COUNT ? MAX_COUNT : value);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleChangePaymentType = (evt: ChangeEvent<HTMLInputElement>) => {
    const type = evt.target.value as PaymentType;
    setPaymentType(type);
  };

  return (
    <FocusLock>
      <div className="popup__wrapper">
        <PopupHeader onClose={onClose} title={title} />

        <div className="popup__content popup__content--purchases">
          {isLoading && <Loader />}
          <div className="popup__product">
            <Image src={training.bgImage} className="popup__product-image" width={98} height={80} />
            <div className="popup__product-info">
              <h3 className="popup__product-title">{training.title}</h3>
              <p className="popup__product-price">{training.price} ₽</p>
            </div>

            <CheckCount
              count={count}
              onChange={handleInputCount}
              onIncriment={handleIncrement}
              onDecriment={handleDecrement}
              maxCount={MAX_COUNT}
              disabled={isLoading}
            />
          </div>

          <section className="payment-method">
            <h4 className="payment-method__title">Выберите способ оплаты</h4>
            <CheckPayment value={paymentType} onChange={handleChangePaymentType} disabled={totalPrice === 0 || isLoading} />
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
    </FocusLock>
  );
};

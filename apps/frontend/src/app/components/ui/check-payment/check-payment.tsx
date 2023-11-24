import React, { ChangeEvent } from "react";
import { ButtonRadioImage } from "../button-radio-image/button-radio-image";
import { PaymentType } from "@fit-friends/shared";

interface CheckPaymentProps {
    onChange: (value: ChangeEvent<HTMLInputElement>) => void;
    value: PaymentType;
    disabled?: boolean;
}

export const CheckPayment: React.FC<CheckPaymentProps> = (props) => {
    const { onChange, value, disabled } = props;

    return (
        <ul className="payment-method__list">
              <li className="payment-method__item">
                <ButtonRadioImage
                  image="visa-logo"
                  name="paymentType"
                  value={PaymentType.Visa}
                  onChange={onChange}
                  checked={value === PaymentType.Visa}
                  disabled={disabled}
                />
              </li>
              <li className="payment-method__item">
                <ButtonRadioImage
                  image="mir-logo"
                  name="paymentType"
                  value={PaymentType.Mir}
                  onChange={onChange}
                  checked={value === PaymentType.Mir}
                  disabled={disabled}
                />
              </li>
              <li className="payment-method__item">
                <ButtonRadioImage
                  image="iomoney-logo"
                  name="paymentType"
                  value={PaymentType.Umoney}
                  onChange={onChange}
                  checked={value === PaymentType.Umoney}
                  disabled={disabled}
                />
              </li>
            </ul>
    );
}
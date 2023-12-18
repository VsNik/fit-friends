import React, { useRef } from 'react';
import FocusLock from 'react-focus-lock';
import { PopupHeader } from '../popup-header/popup-header';
import { ButtonIcon } from '../../ui/button-icon/button-icon';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useSliderControl } from '../../../hooks/use-slider-control';
import { CountSlide } from '../../../constants/common';

interface CertificatesPopupProps {
  onClose: () => void;
  certificates?: string[];
  title: string;
}

export const CertificatesPopup: React.FC<CertificatesPopupProps> = (props) => {
  const { onClose, certificates, title } = props;
  const sliderRef = useRef<SwiperRef | null>(null);

  const { handlePrev, handleNext, isFirstSlide, isLastSlide, handleChangeSlide } = useSliderControl(
    sliderRef,
    certificates ?? [],
    CountSlide.PopupCertificate,
  );

  return (
    <FocusLock>
      <div className="popup__wrapper">
        <PopupHeader onClose={onClose} title={title} />

        <div className="popup__content popup__content--certificates">
          <div className="popup__slider-buttons">
            <ButtonIcon icon="arrow-left" className="popup__slider-btn popup__slider-btn--prev" onClick={handlePrev} disabled={isFirstSlide} dataTestId='prev-slide' />
            <ButtonIcon icon="arrow-right" className="popup__slider-btn popup__slider-btn--prev" onClick={handleNext} disabled={isLastSlide} dataTestId='next-slide' />
          </div>

          {certificates?.length ? <Swiper
            slidesPerView={CountSlide.PopupCertificate}
            className="popup__slider-list"
            onSlideChange={(swipper) => handleChangeSlide(swipper.realIndex)}
            ref={sliderRef}
          >
            {certificates?.map((certificate) => (
              <SwiperSlide key={certificate}>
                <li className="popup__slide popup__slide--current" >
                  <div className="popup__slide-img">
                    <iframe src={`${certificate}#toolbar=0`} width={294} height={360} title="certificate" style={{ border: 0 }} data-testid='certificate-popup-frame' />
                  </div>
                </li>
              </SwiperSlide>
            ))}
          </Swiper> : (
            <h3>Сертификатов нет</h3>
          )}
        </div>
      </div>
    </FocusLock>
  );
};

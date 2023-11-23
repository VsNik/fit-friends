import React, { useCallback, useRef } from 'react';
import { PopupHeader } from '../popup-header/popup-header';
import { ButtonIcon } from '../../ui/button-icon/button-icon';
import { Image } from '../../ui/image/image';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useSliderControl } from '../../../hooks/use-slider-control';

const SLIDERS = 1;

interface CertificatesPopupProps {
  onClose: () => void;
  certificates?: string[];
  title: string;
}

export const CertificatesPopup: React.FC<CertificatesPopupProps> = (props) => {
  const { onClose, certificates, title } = props;
  const sliderRef = useRef<SwiperRef | null>(null);

  const indexSlide = sliderRef.current?.swiper.realIndex ?? 0;
  const { isDisablePrev, isDisableNext, handleChangeSlide } = useSliderControl(indexSlide, certificates ?? [], SLIDERS);

  const handlePrev = useCallback(() => {
    sliderRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    sliderRef.current?.swiper.slideNext();
  }, []);

  return (
    <section className="popup">
      <div className="modal__overlay" onClick={onClose} />
      <div className="popup__wrapper">
        <PopupHeader onClose={onClose} title={title} />

        <div className="popup__content popup__content--certificates">
          <div className="popup__slider-buttons">
            <ButtonIcon icon="arrow-left" className="popup__slider-btn popup__slider-btn--prev" onClick={handlePrev} disabled={isDisablePrev} />
            <ButtonIcon icon="arrow-right" className="popup__slider-btn popup__slider-btn--prev" onClick={handleNext} disabled={isDisableNext} />
          </div>

          <Swiper 
            slidesPerView={SLIDERS} 
            className="popup__slider-list"
            onSlideChange={(swipper) => handleChangeSlide(swipper.realIndex)} 
            ref={sliderRef}
          >
            {certificates?.map((certificate) => (
              <SwiperSlide key={certificate}>
                <li className="popup__slide popup__slide--current">
                  <Image src={certificate} className="popup__slide-img" width={294} height={360} />
                </li>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
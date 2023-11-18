import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { IUser } from '@fit-friends/shared';
import { CertificatCarouselItem } from './certificat-carousel-item';
import { ButtonUploadFloat } from '../ui/button-upload-float/button-upload-float';
import { ButtonIcon } from '../ui/button-icon/button-icon';
import 'swiper/css';
import { useSliderControl } from '../../hooks/use-slider-control';

const SLIDERS = 3;

interface CertificateCarouserProps {
  user: IUser;
}

export const CertificateCarousel: React.FC<CertificateCarouserProps> = ({ user }) => {
  const [certificates, setCertificates] = useState<string[]>([]);
  const sliderRef = useRef<SwiperRef | null>(null);

  useEffect(() => {
    if (user.certificate) {
      setCertificates(Array.isArray(user.certificate) ? user.certificate : [user.certificate]);
    }
  }, [user.certificate]);

  const indexSlide = sliderRef.current?.swiper.realIndex ?? 0;
  const {isFirstSlide, isLastSlide, handleChangeSlide} = useSliderControl(indexSlide, certificates, SLIDERS)

  // useEffect(() => {
  //   const index = sliderRef.current?.swiper.realIndex ?? 0;
  //   setIsLastSlide(index + SLIDERS >= certificates.length);
  // }, [certificates]);

  // const handleChangeSlide = (slideIndex: number) => {
  //   setIsFirstSlide(slideIndex === 0);
  //   setIsLastSlide(slideIndex + SLIDERS >= certificates.length);
  // };

  const handlePrev = useCallback(() => {
    sliderRef.current?.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    sliderRef.current?.swiper.slideNext();
  }, []);

  return (
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>
        <ButtonUploadFloat 
          text='Загрузить' 
          name='certificate' 
          icon='icon-import' 
          accept='.pdf, .jpg, .png' 
          className='personal-account-coach__button' 
          underline 
        />

        <div className="personal-account-coach__controls">
          <ButtonIcon icon='arrow-left' onClick={handlePrev} disabled={isFirstSlide}/>
          <ButtonIcon icon='arrow-right' onClick={handleNext} disabled={isLastSlide}/>
        </div>
      </div>

      <Swiper
        slidesPerView={SLIDERS}
        className="personal-account-coach__list"
        onSlideChange={(swipper) => handleChangeSlide(swipper.realIndex)}
        ref={sliderRef}
      >
        {certificates.map((certificate) => (
          <SwiperSlide key={certificate}>
            <CertificatCarouselItem userId={user.id} src={certificate} alt={`${user.name} - Сертификат`} type="image/jpg" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

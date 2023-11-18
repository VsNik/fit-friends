import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { IUser } from '@fit-friends/shared';
import { CertificatCarouselItem } from './certificat-carousel-item';
import 'swiper/css';
import { ButtonUploadFloat } from '../ui/button-upload-float/button-upload-float';

const SLIDERS = 3;

interface CertificateCarouserProps {
  user: IUser;
}

export const CertificateCarousel: React.FC<CertificateCarouserProps> = ({ user }) => {
  const [certificates, setCertificates] = useState<string[]>([]);
  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(true);
  const sliderRef = useRef<SwiperRef | null>(null);

  useEffect(() => {
    if (user.certificate) {
      setCertificates(Array.isArray(user.certificate) ? user.certificate : [user.certificate]);
    }
  }, [user.certificate]);

  useEffect(() => {
    const index = sliderRef.current?.swiper.realIndex ?? 0;
    setIsLastSlide(index + SLIDERS >= certificates.length);
  }, [certificates]);

  const handleChangeSlide = (slideIndex: number) => {
    setIsFirstSlide(slideIndex === 0);
    setIsLastSlide(slideIndex + SLIDERS >= certificates.length);
  };

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
          <button
            className="btn-icon personal-account-coach__control"
            type="button"
            aria-label="previous"
            onClick={handlePrev}
            disabled={isFirstSlide}
          >
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#arrow-left" />
            </svg>
          </button>
          <button 
            className="btn-icon personal-account-coach__control" 
            type="button" 
            aria-label="next" 
            onClick={handleNext} 
            disabled={isLastSlide}
          >
            <svg width="16" height="14" aria-hidden="true">
              <use xlinkHref="/assets/img/sprite.svg#arrow-right" />
            </svg>
          </button>
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

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { IUser } from '@fit-friends/shared';
import { ThumbnailCertificat } from '../thumbnails/thumbnail-certificat/thumbnail-certificat';
import { ButtonIcon } from '../ui/button-icon/button-icon';
import { useSliderControl } from '../../hooks/use-slider-control';
import { ButtonFloat } from '../ui/button-float/button-float';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CountSlide, LoadStatus } from '../../constants/common';
import { addCertificateAction } from '../../store/user/async-actions';
import * as authSelector from '../../store/auth/auth-select';
import 'swiper/css';

interface CertificateSliderProps {
  user: IUser;
}

export const CertificateSlider: React.FC<CertificateSliderProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const loadStatus = useAppSelector(authSelector.loadStatus);
  const [certificates, setCertificates] = useState<string[]>([]);
  const sliderRef = useRef<SwiperRef | null>(null);
  const certificateRef = useRef<HTMLInputElement | null>(null);

  const isLoading = loadStatus === LoadStatus.Loading;

  useEffect(() => {
    if (user.certificate) {
      const userCertificates = Array.isArray(user.certificate) ? user.certificate : [user.certificate];
      setCertificates(userCertificates);
    }
  }, [user.certificate]);

  const { handlePrev, handleNext, isFirstSlide, isLastSlide, handleChangeSlide } = 
    useSliderControl(sliderRef, certificates, CountSlide.Certificate);

  const handleClicAddCertificate = () => {
    certificateRef.current?.click();
  };

  const handleUpload = (fileList: FileList | null) => {
    if (fileList && fileList[0]) {
      const formData = new FormData();
      formData.append('certificate', fileList[0]);
      dispatch(addCertificateAction({ id: user.id, formData }));
    }
  };

  return (
    <div className="personal-account-coach__additional-info">
      <div className="personal-account-coach__label-wrapper">
        <h2 className="personal-account-coach__label">Дипломы и сертификаты</h2>

        <input
          className="visually-hidden"
          type="file"
          name="certificate"
          accept=".pdf, .jpg, .png"          
          onChange={(evt) => handleUpload(evt.target.files)}
          ref={certificateRef}
        />

        <ButtonFloat
          text="Загрузить"
          icon="icon-import"
          className="personal-account-coach__button"
          underline
          onClick={handleClicAddCertificate}
          disabled={isLoading}
        />

        <div className="personal-account-coach__controls">
          <ButtonIcon icon="arrow-left" onClick={handlePrev} disabled={isFirstSlide} />
          <ButtonIcon icon="arrow-right" onClick={handleNext} disabled={isLastSlide} />
        </div>
      </div>

      <Swiper
        slidesPerView={CountSlide.Certificate}
        className="personal-account-coach__list"
        onSlideChange={(swipper) => handleChangeSlide(swipper.realIndex)}
        ref={sliderRef}
      >
        {certificates.map((certificate) => (
          <SwiperSlide key={certificate}>
            <ThumbnailCertificat userId={user.id} src={certificate} alt={`${user.name} - Сертификат`} type="image/jpg" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

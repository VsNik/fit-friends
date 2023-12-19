import { useState, useEffect, RefObject } from 'react';
import { SwiperRef } from 'swiper/react';

type SlidListType = string[] | object[];

export const useSliderControl = (sliderRef: RefObject<SwiperRef>, items: SlidListType, showCount: number) => {
  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(true);  

  useEffect(() => {
    const indexSlide = sliderRef.current?.swiper.realIndex ?? 0;
    setIsLastSlide(indexSlide + showCount >= items.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, showCount]);

  const handleChangeSlide = (slideIndex: number) => {
    setIsFirstSlide(slideIndex === 0);
    setIsLastSlide(slideIndex + showCount >= items.length);
  };

  const handlePrev = () => {
    sliderRef.current?.swiper.slidePrev();
  }

  const handleNext = () => {
    sliderRef.current?.swiper.slideNext();
  }

  return {
    handleChangeSlide,
    handlePrev,
    handleNext,
    isFirstSlide,
    isLastSlide,    
  };
};

import { useState, useEffect } from 'react';

export const useSliderControl = (index: number, items: string[] | object[], showCount: number) => {
  const [isFirstSlide, setIsFirstSlide] = useState<boolean>(true);
  const [isLastSlide, setIsLastSlide] = useState<boolean>(true);

  useEffect(() => {
    setIsLastSlide(index + showCount >= items.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, showCount]);

  const handleChangeSlide = (slideIndex: number) => {
    setIsFirstSlide(slideIndex === 0);
    setIsLastSlide(slideIndex + showCount >= items.length);
  };

  return {
    isDisablePrev: isFirstSlide,
    isDisableNext: isLastSlide,
    handleChangeSlide,
  };
};

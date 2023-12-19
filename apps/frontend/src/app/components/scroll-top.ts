import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const StartPosition = {
  Top: 0,
  Left: 0,
} as const;

export const ScrollTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: StartPosition.Top,
      left: StartPosition.Left,
    });
  }, [pathname]);

  return null;
};

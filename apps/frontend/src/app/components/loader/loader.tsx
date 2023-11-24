import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import './styles.css';

export const Loader: React.FC = () => {
  return (
    <section className="loader-wrapp">
      <RotatingLines 
        strokeColor="#c5ec2a" 
        strokeWidth="5" 
        animationDuration="0.75" 
        width="96" 
        visible={true} 
      />
    </section>
  );
};

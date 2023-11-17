import React from 'react';

interface TrainingTextareaProps {
  name: string;
  text?: string;
  label?: string;
}

export const TrainingTextarea: React.FC<TrainingTextareaProps> = ({ name, label, text }) => {
  return (
    <div className="training-info__textarea">
      <label>
        <span className="training-info__label">{label}</span>
        <textarea name={name}>{text}</textarea>
      </label>
    </div>
  );
};

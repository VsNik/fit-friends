import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface InputFileProps {
  name: string;
  accept?: string;
  disabled?: boolean;
}

export const InputFile: React.FC<InputFileProps> = (props) => {
  const { name, accept, disabled } = props

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();
  const [fileName, setFileName] = useState<string>('');
  const fileList = watch(name);

  useEffect(() => {
    if (fileList && fileList[0]) {
      setFileName(fileList[0].name);
    }
  }, [fileList]);

  return (
    <div className="drag-and-drop questionnaire-coach__drag-and-drop">
      <label>
        <span className="drag-and-drop__label" tabIndex={0}>
          {fileName ? fileName : 'Загрузите сюда файлы формата PDF, JPG или PNG'}
          <svg width="20" height="20" aria-hidden="true">
            <use xlinkHref="/assets/img/sprite.svg#icon-import" />
          </svg>
        </span>
        <input {...register(name)} type="file" name={name} tabIndex={-1} accept={accept} disabled={disabled}/>
        {errors[name] && <i className="custom-input__error">{errors[name]?.message as string}</i>}
      </label>
    </div>
  );
};

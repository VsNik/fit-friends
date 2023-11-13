import {useEffect, useState} from "react";

export const useImagePreview = (imageFile: FileList) => {
  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const newImageUrl = URL.createObjectURL(imageFile[0]);

      if (newImageUrl !== previewImage) {
        setPreviewImage(newImageUrl);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile])

  const resetImage = () => {
    setPreviewImage('');
  }

  return {
    previewImage,
    resetImage
  };
}

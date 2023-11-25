import React, { ChangeEvent } from 'react';
import { isValidFileType, isValidFileSize } from '../../utils/validation/ImageFileValidation';
import { ImageFile } from '../../types/imageFile';

interface ImageUploadProps {
  setImagePreviewUrl: (imagePreviewUrl: string) => void;
  handleAddImage: (images: ImageFile[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ setImagePreviewUrl, handleAddImage }) => {

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const fileInput = e.target;
    if (fileInput.files && fileInput.files[0]) {
      const newFile = fileInput.files[0];

      if (isValidFileType(newFile) && isValidFileSize(newFile)) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const imageFile: ImageFile = { ...newFile, data_url: reader.result as string };
          handleAddImage([imageFile]);
          setImagePreviewUrl(reader.result as string);
        };

        reader.readAsDataURL(newFile);
      } else {
        console.error('Invalid file. Please select a valid image file within the specified size limit.');
      }
    }
  };

  const handleUploadClick = () => {
    setImagePreviewUrl('');
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button type='button' onClick={handleUploadClick}>Remove Image</button>
    </div>
  );
};

export default ImageUpload;

import React from 'react';
import { isValidFileType, isValidFileSize } from '../../utils/validation/ImageFileValidation';
import { ImageFile } from '../../types/imageFile';
import remove from '../../assets/svg/closeIcon.svg';
import upload from '../../assets/svg/uploadIcon.svg';
import styles from './UploadImage.module.scss';
import { FileReadError } from '../../errorHandler/fileReadError';
import CustomFileInput from '../Buttons/CustomFileInput';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';

interface UploadImageProps {
  setImagePreviewUrl: (imagePreviewUrl: string) => void;
  handleAddImage?: (images: ImageFile[]) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ setImagePreviewUrl, handleAddImage }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const fileInput = e.target;
    if (fileInput.files && fileInput.files[0]) {
      const newFile = fileInput.files[0];

      if (isValidFileType(newFile) && isValidFileSize(newFile)) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const imageFile: ImageFile = { file: newFile };
          if (handleAddImage) handleAddImage([imageFile]);
          setImagePreviewUrl(reader.result as string);
        };

        reader.readAsDataURL(newFile);
      } else {
        throw new FileReadError('Invalid file. Please select a valid image file within the specified size limit.');
      }
    }
  };

  const handleRemoveImage = () => {
    setImagePreviewUrl('');
    if (handleAddImage) handleAddImage([]);
  };

  return (
    <div className={styles.icons}>
      <CustomFileInput
        onChange={handleImageChange}
        accept="image/png, image/jpg, image/gif, image/jpeg"
        icon={upload}
        altText="Upload Icon"
      />
      <ButtonWithIcon
        onClick={handleRemoveImage}
        icon={remove}
        altText="Remove Icon" />
    </div>
  );
};

export default UploadImage;

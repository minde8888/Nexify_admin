import React, { ChangeEvent } from 'react';
import { isValidFileType, isValidFileSize } from '../../utils/validation/ImageFileValidation';
import { ImageFile } from '../../types/imageFile';
import remove from '../../assets/svg/closeIcon.svg'
import upload from '../../assets/svg/uploadIcon.svg'
import styles from './UploadImage.module.scss'

interface UploadImageProps {
  setImagePreviewUrl: (imagePreviewUrl: string) => void;
  handleAddImage: (images: ImageFile[]) => void;
}

interface ImageFileWithFile {
  file?: File;
}

const UploadImage: React.FC<UploadImageProps> = ({ setImagePreviewUrl, handleAddImage }) => {

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const fileInput = e.target;
    if (fileInput.files && fileInput.files[0]) {
      const newFile = fileInput.files[0];

      if (isValidFileType(newFile) && isValidFileSize(newFile)) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const imageFile: ImageFileWithFile = { file: newFile };
          handleAddImage([imageFile]);;
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
    handleAddImage([]);
  };

  return (
    <div className={styles.icons}>
      <label htmlFor="inputTag">
        <img src={upload} alt="imgAltText" />
        <input id="inputTag" type="file" onChange={handleImageChange} accept="image/png, image/jpg, image/gif, image/jpeg" />
      </label>
      <div >
        <img src={remove} alt="imgAltText" onClick={handleUploadClick} />
      </div>
    </div>
  );
};

export default UploadImage;

import React, { ChangeEvent, useCallback, useState } from 'react';
import { isValidFileType, isValidFileSize } from '../../utils/validation/ImageFileValidation';
import { ImageFile } from '../../types/imageFile';
import remove from '../../assets/svg/closeIcon.svg';
import upload from '../../assets/svg/uploadIcon.svg';
import styles from './UploadImage.module.scss';
import { FileReadError } from '../../errorHandler/fileReadError';
import CustomFileInput from '../Buttons/CustomFileInput';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import { compressImage } from '../../utils/helpers/compressImage';
import { dataURLtoFile } from '../../utils/helpers/dataURLtoFile';
import { DEFAULT_IMAGE_SIZE } from '../../constants/imageConst';

interface UploadImageProps {
  setImagePreviewUrl: (imagePreviewUrl: string) => void;
  handleAddImage?: (images: ImageFile[]) => void;
  targetSizeKB?: number;
}

const UploadImage: React.FC<UploadImageProps> = ({
  setImagePreviewUrl,
  handleAddImage,
  targetSizeKB = DEFAULT_IMAGE_SIZE
}) => {
  const [error, setError] = useState<string>('');

  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidFileType(file) || !isValidFileSize(file)) {
      throw new FileReadError('Invalid file. Please select a valid image file within the specified size limit.');
    }

    compressImage(file, targetSizeKB, (compressedDataUrl) => {
      if (compressedDataUrl) {
        setImagePreviewUrl(compressedDataUrl);
        if (handleAddImage) {
          const compressedFile = dataURLtoFile(compressedDataUrl, file.name);
          handleAddImage([{ file: compressedFile }]);
        }
      } else {
        setError('Could not compress the image to the desired size.');
      }
    });

  }, [targetSizeKB, setImagePreviewUrl, handleAddImage]);

  const handleRemoveImage = useCallback(() => {
    setError('');
    setImagePreviewUrl('');
    if (handleAddImage) handleAddImage([]);
  }, [setImagePreviewUrl, handleAddImage]);

  return (
    <>
      {error && <div>{error}</div>}
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
          altText="Remove Icon"
        />
      </div>
    </>
  );
};

export default UploadImage;

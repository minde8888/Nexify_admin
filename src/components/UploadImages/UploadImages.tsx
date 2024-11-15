import React, { useCallback, useEffect, useState } from 'react';
import ImageUploading, { ImageListType, ImageType } from 'react-images-uploading';
import closeIcon from '../../assets/svg/closeIcon.svg';
import uploadIcon from '../../assets/svg/uploadIcon.svg';
import tempImage from '../../assets/svg/tempImage.svg';
import { IconButton } from '../Buttons/IconButton/IconButton';
import { compressImage } from '../../utils/helpers/compressImage/compressImage';
import { dataURLtoFile } from '../../utils/helpers/dataURLtoFile/dataURLtoFile';
import { ImageFile } from '../../types/imageFile';
import { DEFAULT_IMAGE_SIZE } from '../../constants/imageConst';
import { isArrayNotEmpty } from '../../utils/helpers/isArrayNotEmpty/isArrayNotEmpty';

const UploadImages: React.FC<ImagesProps> = (
    { getImages, maxNumber, resetImages, setResetImages, initialImages, styleDrop = '', styles }) => {
    const [images, setImages] = useState<ImageType[]>([]);

    useEffect(() => {
        if (resetImages) {
            setImages([]);
            setResetImages(false);
        }
    }, [resetImages, setResetImages]);

    useEffect(() => {
        if (isArrayNotEmpty<string>(initialImages)) {
            const initialImageList = initialImages.map((url) => ({
                data_url: url,
            }));
            setImages(initialImageList);
        }
    }, [initialImages]);

    const compressImages = async (imageList: ImageType[]): Promise<ImageFile[]> => {
        const promises = imageList.map(async image => {
            if (!image.file) return { file: image.file, data_url: image.data_url };
            const compressedDataURL = await new Promise<string | null>(resolve => {
                if (image.file) {
                    compressImage(image.file, DEFAULT_IMAGE_SIZE, resolve);
                } else {
                    resolve(null);
                }
            });
            return { file: compressedDataURL ? dataURLtoFile(compressedDataURL, image.file.name) : image.file, data_url: image.data_url };
        });

        return Promise.all(promises);
    };

    const onChange = useCallback(async (imageList: ImageListType) => {
        const compressedFiles = await compressImages(imageList as ImageType[]);
        getImages(compressedFiles);
        setImages(imageList);
    }, [getImages]);

    const onRemoveIndex = useCallback((index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);

        getImages(updatedImages);
    }, [images, getImages]);

    useEffect(() => {
        if (resetImages) {
            setImages([]);
            setResetImages(false);
        }
    }, [resetImages, setResetImages]);

    return (
        <div className={styles.image}>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={['jpg', 'gif', 'png', 'gif']}
            >
                {({ imageList, onImageUpload, onImageUpdate, isDragging, dragProps, errors }) => (
                    <div className={styles.upload_image}>
                        <div
                            className={`${styleDrop}`}
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                            data-testid="image-upload-trigger"
                        >
                            <div className={styles.dropText}>Click or Drop image here </div>
                            <img className={styles.uploadIcon} src={tempImage} alt="imgAltText" />
                        </div>
                        {imageList.map((image, index) => (
                            <div key={index} className={styles.image_item}>
                                <img className={styles.image_show} src={image['data_url']} alt="" width="100" />
                                <div className={styles.image_btn_wrapper}>
                                    <IconButton onClick={() => onImageUpdate(index)} icon={uploadIcon} />
                                    <IconButton onClick={() => onRemoveIndex(index)} icon={closeIcon} id={'-1'} />
                                </div>
                            </div>
                        ))}
                        {errors && (
                            <div>
                                {errors.maxNumber && (
                                    <span>`Number of selected images exceeds the maximum of {maxNumber}`</span>
                                )}
                                {errors.acceptType && (
                                    <div className={styles.profileError}>Your selected file type is not allowed</div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
};

export default UploadImages;
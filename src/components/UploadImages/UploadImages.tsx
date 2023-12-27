import React, { useCallback, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { ImageFile } from '../../types/imageFile';
import closeIcon from '../../assets/svg/closeIcon.svg';
import uploadIcon from '../../assets/svg/uploadIcon.svg';
import tempImage from '../../assets/svg/tempImage.svg';
import uploadImagesStyles from '../../styles/uploadImages.module.scss';
import { IconButton } from '../Buttons/IconButton';

interface ImagesProps {
    getImages: (ImageData: Array<ImageFile>) => void;
    maxNumber: number;
}

const UploadImages: React.FC<ImagesProps> = ({ getImages, maxNumber }) => {
    const [images, setImages] = useState([]);

    const onChange = useCallback((imageList: ImageListType): void => {
        setImages(imageList as []);
        getImages(imageList as ImageFile[]);
    }, [getImages]);

    return (
        <div className={uploadImagesStyles.image}>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={['jpg', 'gif', 'png', 'gif']}
            >
                {({ imageList, onImageUpload, onImageUpdate, onImageRemove, onImageRemoveAll, isDragging, dragProps, errors }) => (
                    <div className={uploadImagesStyles.upload_image}>
                        <div
                            className={uploadImagesStyles.clickDrop}
                            style={isDragging ? { color: 'red' } : undefined}
                            onClick={onImageUpload}
                            {...dragProps}
                        >
                            <div>Click or Drop image here </div>
                            <img src={tempImage} alt="imgAltText" />
                        </div>
                        {imageList.map((image, index) => (
                            <div key={index} className={uploadImagesStyles.image_item}>
                                <img className={uploadImagesStyles.image_show} src={image['data_url']} alt="" width="100" />
                                <div className={uploadImagesStyles.image_btn_wrapper}>
                                    <IconButton onClick={() => onImageUpdate(index)} icon={uploadIcon} />
                                    <IconButton onClick={() => onImageRemove(index)} icon={closeIcon} />
                                </div>
                            </div>
                        ))}
                        {errors && (
                            <div>
                                {errors.maxNumber && (
                                    <span>`Number of selected images exceeds the maximum of {maxNumber}`</span>
                                )}
                                {errors.acceptType && (
                                    <div className={uploadImagesStyles.profileError}>Your selected file type is not allowed</div>
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

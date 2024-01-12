import { FunctionComponent, useEffect } from 'react';
import { Modal } from '../../Modal/Modal';
import { TextInputField } from '../../InputFields/TextInputField';
import UploadImage from '../../UploadImage/UploadImage';
import PropertyImagePreview from '../../PropertyImagePreview/PropertyImagePreview';
import { ImageFile } from '../../../types/imageFile';
import { FormValues } from '../../../hooks/useFormikValues';
import styles from './edit.module.scss';
import EnhancedMdxEditorComponent from '../../MarkDownEditor/EnhancedMdxEditorComponent';

interface EditPostModalProps extends FormValues {
    isOpen: boolean;
    toggle: () => void;
    onCancel: () => void;
    content: string;
    setContent: (content: string) => void;
    handleAddImage?: (file: ImageFile[]) => void;
    setImagePreviewUrl: (imagePreviewUrl: string) => void;
    imagePreviewUrl: string;
    disabled: boolean;
    values: FormValues;
}

const EditPostModal: FunctionComponent<EditPostModalProps> = ({
    isOpen,
    toggle,
    onCancel,
    content,
    setContent,
    handleAddImage,
    setImagePreviewUrl,
    imagePreviewUrl,
    disabled,
    values
}) => {

    const buttonStyles = {
        saveButton: styles.saveButton,
        closeModalButton: styles.closeModalButton,
    };

    useEffect(() => {
        if (disabled) {
            onCancel();
        }
    }, [disabled, onCancel]);

    return (
        <div>
            <TextInputField
                className={styles.titleField}
                name="categoryName"
                label="Category Name"
                id="categoryName"
                placeholder="Enter category name"
                initialValue={values.categoryName}
            />
            <PropertyImagePreview imagePreviewUrl={imagePreviewUrl} />
            <UploadImage
                setImagePreviewUrl={setImagePreviewUrl}
                handleAddImage={handleAddImage}
            />
            <EnhancedMdxEditorComponent content={content} setContent={setContent} width='95%' />
            <div className={buttonStyles.saveButton}>
                <button disabled={disabled} type="submit">Save</button>
            </div>
            <div className={buttonStyles.closeModalButton}>
                <button data-testid="test-close-id" onClick={onCancel} type="button">
                    ❌
                </button>
            </div>
        </div>
    );
};

export default EditPostModal;

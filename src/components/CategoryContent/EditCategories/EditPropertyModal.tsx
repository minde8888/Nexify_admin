import { FunctionComponent, useEffect } from 'react';
import { Modal } from '../../Modal/Modal';
import { TextInputField } from '../../InputFields/TextInputField';
import UploadImage from '../../UploadImage/UploadImage';
import PropertyImagePreview from '../../PropertyImagePreview/PropertyImagePreview';
import MarkDownEditor from '../../MarkDownEditor/MarkDownEditor';
import styles from './edit.module.scss';
import { ImageFile } from '../../../types/imageFile';
import { FormValues } from '../../../hooks/useFormikValues';

interface EditPropertyModalProps extends FormValues {
    isOpen: boolean;
    toggle: () => void;
    onCancel: () => void;
    categoryName?: string;
    content: string;
    setContent: (content: string) => void;
    handleAddImage?: (file: ImageFile[]) => void;
    setImagePreviewUrl: (imagePreviewUrl: string) => void;
    imagePreviewUrl: string;
    disabled: boolean;
    values: FormValues;
}

const EditPropertyModal: FunctionComponent<EditPropertyModalProps> = ({
    isOpen,
    toggle,
    onCancel,
    categoryName,
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
        <Modal isOpen={isOpen} toggle={toggle}>
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
            <MarkDownEditor content={content} setContent={setContent} showEditor={true} width='95%' />
            <div className={buttonStyles.saveButton}>
                <button disabled={disabled} type="submit">Save</button>
            </div>
            <div className={buttonStyles.closeModalButton}>
                <button data-testid="test-close-id" onClick={onCancel} type="button">
                    ❌
                </button>
            </div>
        </Modal>
    );
};

export default EditPropertyModal;

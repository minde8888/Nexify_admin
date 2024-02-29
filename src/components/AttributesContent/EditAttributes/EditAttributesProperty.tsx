import { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { TextInputField } from '../../InputFields/TextInputField';
import UploadImage from '../../UploadImage/UploadImage';
import PropertyImagePreview from '../../PropertyImagePreview/PropertyImagePreview';
import useFormikValues from '../../../hooks/useFormikValues';
import { ImageFile } from '../../../types/imageFile';
import styles from '../../../styles/editIcons.module.scss';

interface CustomFormValues {
    categoryName: string;
    description: string;
    imageSrc: string;
}

interface EditAttributesFormProps {
    attributeName: string;
    imageDescription: string;
    imageName: string;
    disabled: boolean;
}

const EditAttributesForm: FunctionComponent<EditAttributesFormProps> = ({
    attributeName,
    imageDescription,
    imageName,
    disabled,
}) => {
    const { addNewValue } = useFormikValues();

    const [file, setFile] = useState<ImageFile[]>([]);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(imageName || '');

    useEffect(() => {
        setImagePreviewUrl(imageName || '');
    }, [imageName]);

    useEffect(() => {
        const newValues: CustomFormValues = {
            categoryName: attributeName,
            description: imageDescription,
            imageSrc: imagePreviewUrl,
        };
        addNewValue(newValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attributeName, imageDescription, imagePreviewUrl]);

    const handleAddImage = useCallback((newFile: ImageFile[]) => setFile(newFile), []);

    return (
        <div className={styles.container}>
            <TextInputField
                className={styles.titleField}
                name="attributeName"
                label="Attribute Name"
                id="attributeName"
                placeholder="Enter attribute name"
                initialValue={attributeName}
            />
            <PropertyImagePreview
                imagePreviewUrl={imagePreviewUrl}
                width="100%"
                height="100%"
            />
            <UploadImage
                setImagePreviewUrl={setImagePreviewUrl}
                handleAddImage={handleAddImage}
            />
            <button className={styles.buttonPublic} disabled={disabled} type="submit">
                Publish
            </button>
        </div>
    );
};

export default EditAttributesForm;

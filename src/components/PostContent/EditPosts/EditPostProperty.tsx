import { FunctionComponent, useEffect, useState } from 'react';
import { TextInputField } from '../../InputFields/TextInputField';
import { ImageFile } from '../../../types/imageFile';
import useFormikValues from '../../../hooks/useFormikValues';
import styles from './edit.module.scss';
import EnhancedMdxEditorComponent from '../../MarkDownEditor/EnhancedMdxEditorComponent';
import UploadImages from '../../UploadImages/UploadImages';
import { Post } from '../../../types/post';

interface CustomPostProps extends Post {
    categoriesIds?: string[];
}

interface EditPostPropertyProps extends Post {
    disabled: boolean;
    resetImages: boolean;
    setResetImages: (value: boolean) => void;
    categoriesIds?: string[];
}

const initialFormState: CustomPostProps = {
    id: '',
    title: '',
    content: '',
    images: [],
    imageName: '',
    categoriesIds: [],
};

const EditPostProperty: FunctionComponent<EditPostPropertyProps> = ({
    id, title, content, imageSrc, disabled, resetImages, setResetImages, categoriesIds
}) => {

    const { addNewValue } = useFormikValues<Post[]>();
    const [postValues, setPostValues] = useState<CustomPostProps>({ ...initialFormState, id, title, content });

    useEffect(() => {
        setPostValues({ id, title, content });
    }, [id, title, content]);

    useEffect(() => {
        addNewValue({ id, title, content, categoriesIds });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getImagesData = async (files: ImageFile[]): Promise<void> => {
        if (files.length) {
            addNewValue({ images: files.map(file => file.file) });
        }
    };

    return (
        <div>
            <TextInputField
                label="Title"
                className={styles.profileInput}
                name="title"
                id="title"
                initialValue={postValues.title}
            />
            <UploadImages
                getImages={getImagesData}
                maxNumber={1}
                resetImages={resetImages}
                setResetImages={setResetImages}
                initialImages={imageSrc}
            />
            <EnhancedMdxEditorComponent
                content={postValues.content || ''}
                setContent={(newContent) => setPostValues({ ...postValues, content: newContent })}
                width='95%' />
            <div className={styles.saveButton}>
                <button disabled={disabled} type="submit">Save</button>
            </div>
        </div>
    );
};

export default EditPostProperty;

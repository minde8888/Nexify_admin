import { FunctionComponent, useEffect, useState } from 'react';
import { TextInputField } from '../../InputFields/TextInputField';
import UploadImages from '../../UploadImages/UploadImages';
import EnhancedMdxEditorComponent from '../../MarkDownEditor/EnhancedMdxEditorComponent';
import { CheckboxField } from '../../InputFields/CheckboxField';
import useFormikValues from '../../../hooks/useFormikValues';
import { useCheckboxContext } from '../../Context/CheckboxProvider';
import styles from './edit.module.scss';
import { Post } from '../../../types/post';
import { CategoryResponse } from '../../../types/category';
import { ImageFile } from '../../../types/imageFile';

interface EditPostPropertyProps extends Post {
    disabled: boolean;
    resetImages: boolean;
    setResetImages: (value: boolean) => void;
    categoriesIds?: string[];
    categories?: CategoryResponse[];
}

const EditPostProperty: FunctionComponent<EditPostPropertyProps> = ({
    id,
    title,
    content,
    imageSrc,
    disabled,
    resetImages,
    setResetImages,
    categoriesIds,
    categories
}) => {
    const { addNewValue } = useFormikValues<Post[]>();

    const [postValues, setPostValues] = useState({ id, title, content });

    const { checkedCategories, setCheckedCategories } = useCheckboxContext();

    useEffect(() => {
        addNewValue({ categoriesIds: Object.keys(checkedCategories).filter(key => checkedCategories[key]) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedCategories]);


    useEffect(() => {
        categoriesIds?.forEach(id => {
            setCheckedCategories(prev => ({ ...prev, [id]: true }));
        });

        addNewValue({ id, title, content });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleContentChange = (newContent: string) => {
        setPostValues(prev => ({ ...prev, content: newContent }));
        addNewValue({ content: newContent });
    };

    const getImagesData = async (files: ImageFile[]): Promise<void> => {
        const images = files.map(file => file.file);
        addNewValue({ images });
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
                setContent={handleContentChange}
                width='95%' />
            <div className={styles.columns}>
                {categories?.map((category) => (
                    <CheckboxField
                        key={category.id}
                        name={category.id}
                        label={category.categoryName}
                        className={styles.checkbox}
                    />
                ))}
            </div>
            <div className={styles.saveButton}>
                <button disabled={disabled} type="submit">Save</button>
            </div>
        </div>
    );
};

export default EditPostProperty;

import { FunctionComponent, useEffect } from 'react';
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
import { useMdxEditorContext } from '../../Context/MdxEditorProvider';

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

    const { checkedCategories, setCheckedCategories } = useCheckboxContext();

    const { content: text } = useMdxEditorContext();

    useEffect(() => {
        categoriesIds?.forEach(id => {
            setCheckedCategories(prev => ({ ...prev, [id]: true }));
        });

        addNewValue({ id, title, content });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        addNewValue({ categoriesIds: Object.keys(checkedCategories).filter(key => checkedCategories[key]) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedCategories]);

    useEffect(() => {
        addNewValue({ content: text });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text])

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
                initialValue={title}
            />
            <UploadImages
                getImages={getImagesData}
                maxNumber={1}
                resetImages={resetImages}
                setResetImages={setResetImages}
                initialImages={imageSrc}
            />
            <EnhancedMdxEditorComponent width='95%' initialContent={text} />
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

import { FunctionComponent, useEffect, useState } from 'react';
import { TextInputField } from '../../InputFields/TextInputField';
import UploadImages from '../../UploadImages/UploadImages';
import EnhancedMdxEditorComponent from '../../MarkDownEditor/EnhancedMdxEditorComponent';
import { CheckboxField } from '../../InputFields/CheckboxField';
import useFormikValues from '../../../hooks/useFormikValues';
import { useCheckboxContext } from '../../../context/checkboxProvider';
import { Post } from '../../../types/post';
import { CategoryResponse } from '../../../types/category';
import { ImageFile } from '../../../types/imageFile';
import { removePartFromUrl } from '../../../utils/helpers/removePartFromUrl/removePartFromUrl';
import { UrlToImages } from '../../../constants/imageConst';
import styles from '../../../styles/edit.module.scss';
import imageStyles from '../../../styles/uploadImages.module.scss';

interface EditPostPropertyProps extends Post {
    disabled: boolean;
    resetImages: boolean;
    setResetImages: (value: boolean) => void;
    categoriesIds?: string[];
    categories?: CategoryResponse[];
    resetChecked: () => void
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
    categories,
    resetChecked
}) => {
    const { addNewValue, values } = useFormikValues<Post[]>();
    const copyValues = values as unknown as Post;

    const imageName = imageSrc?.map(url => removePartFromUrl(url, UrlToImages));
    const [postValues, setPostValues] = useState({ id, title, content, imageNames: imageName });

    const { checked, setChecked } = useCheckboxContext();

    useEffect(() => {
        addNewValue({ categoriesIds: Object.keys(checked).filter(key => checked[key]) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked]);

    useEffect(() => {
        resetChecked()
        categoriesIds?.forEach(id => {
            setChecked(prev => ({ ...prev, [id]: true }));
        });

        addNewValue(postValues);
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
        <div className={styles.container}>
            <div className={styles.inputField}>
                <TextInputField
                    label="Title"
                    className={styles.titleField}
                    name="title"
                    id="title"
                    initialValue={copyValues.title}
                />
            </div>
            <div className={styles.images}>
                <UploadImages
                    getImages={getImagesData}
                    maxNumber={1}
                    resetImages={resetImages}
                    setResetImages={setResetImages}
                    initialImages={imageSrc}
                    styleDrop={styles.clickDrop}
                    styles={imageStyles}
                />
            </div>
            <div className={`${styles.columns} ${styles.checkboxContainer}`}>
                {categories?.map((category) => (
                    <CheckboxField
                        key={category.id}
                        name={category.id}
                        label={category.title}
                        className={styles.checkbox}
                    />
                ))}
            </div>
            <div className={`${styles.columns} ${styles.content}`}>
                <EnhancedMdxEditorComponent
                    content={postValues.content || ''}
                    setContent={handleContentChange}
                    width='100%' />
            </div>
            <div className={styles.buttonPublic}>
                <button disabled={disabled} type="submit">Public</button>
            </div>
        </div>
    );
};

export default EditPostProperty;
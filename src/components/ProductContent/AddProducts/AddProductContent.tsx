import { TextInputField } from '../../InputFields/TextInputField';
import { Fragment, useEffect, useState } from 'react';
import EnhancedMdxEditorComponent from '../../MarkDownEditor/EnhancedMdxEditorComponent';
import { CategoryResponse } from '../../../types/category';
import useFormikValues from '../../../hooks/useFormikValues';
import { ImageFile } from '../../../types/imageFile';
import UploadImages from '../../UploadImages/UploadImages';
import { CheckboxField } from '../../InputFields/CheckboxField';
import styles from '../../../styles/productContent.module.scss'
import imageStyles from '../../../styles/uploadImages.module.scss';
import smallUploadImages from '../../../styles/smallUploadImages.module.scss';
import { Attributes } from '../../../types/attributes';

interface AddProductContentProps {
    setContent: (Content: string) => void;
    content: string;
    resetImages: boolean;
    setResetImages: (value: boolean) => void;
    categories?: CategoryResponse[];
    attributes?: Attributes[];
    checked: { [key: string]: boolean };
    componentKey: number;
    lastRequestStatus: boolean;
}

const AddProductContent = ({
    setContent,
    content,
    resetImages,
    setResetImages,
    categories,
    attributes,
    checked,
    componentKey,
    lastRequestStatus,
}: AddProductContentProps) => {

    const { addNewValue } = useFormikValues();

    const [images, setImages] = useState<ImageFile[]>([])

    const handleAction = () => {

        let categoriesIds: string[] = [];
        let subcategoriesIds: string[] = [];
        let attributesIds: string[] = [];

        categories?.forEach(category => {
            if (checked[category.id]) {
                categoriesIds.push(category.id);
            }
            category.subcategories?.forEach(subcategory => {
                if (checked[subcategory.id]) {
                    subcategoriesIds.push(subcategory.id);
                }
            });
        });

        if (attributes && attributes?.length > 0) {
            attributes?.forEach(attribute => {
                if (attribute.id !== undefined && checked[attribute.id]) {
                    attributesIds.push(attribute.id.toString());
                }
            });
        }
        addNewValue({ categoriesIds, subcategoriesIds, attributesIds, content });
    };

    useEffect(() => {
        handleAction();
        if (resetImages) {
            setImages([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content, checked, resetImages]);

    const getImagesData = async (files: ImageFile[]): Promise<void> => {
        setImages(files)
        addNewValue({ images: files.map(file => file.file) });
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputTitleField}>
                <TextInputField
                    label="Title"
                    className={styles.titleField}
                    name="title"
                    id="title"
                    initialValue={''}
                />
            </div>
            <div className={`${images.length > 0 ? styles.images : styles.imageHeight}`}>
                <UploadImages
                    getImages={getImagesData}
                    maxNumber={10}
                    resetImages={resetImages}
                    setResetImages={setResetImages}
                    styleDrop={styles.clickDrop}
                    styles={imageStyles}
                />
            </div>
            <div className={`${styles.columns} ${styles.checkboxContainer}`}>
                {categories?.map((category) => (
                    <div key={category.id}>
                        <Fragment>
                            <CheckboxField
                                name={category.id}
                                label={category.title}
                                className={styles.checkbox}
                            />
                            {category.subcategories?.map((subcategory) => (
                                <div key={subcategory.id} className={styles.subcategories}>
                                    <CheckboxField
                                        name={subcategory.id}
                                        label={subcategory.title}
                                        className={styles.checkbox}
                                    />
                                </div>
                            ))}
                        </Fragment>
                    </div>
                ))}
            </div>
            <div>
                {attributes && attributes?.length > 0 && attributes?.map((attribute) => (
                    <div key={attribute.id} className={styles.subcategories}>
                        <CheckboxField
                            name={attribute.id?.toString() || ''}
                            label={attribute.attributeName}
                            className={styles.checkbox}
                        />
                    </div>
                ))}
            </div>
            <div className={`${styles.columns} ${styles.content}`}>
                <EnhancedMdxEditorComponent
                    content={content}
                    setContent={setContent}
                    width='100%'
                    componentKey={componentKey}
                />
            </div>
            {['price', 'discount', 'size', 'stock', 'location'].map(field => (
                <div className={styles.inputField} key={field}>
                    <TextInputField label={field} className={styles.titleField} name={field} id={field} initialValue={''} />
                </div>
            ))}
            <div className={styles.buttonPublic}>
                <button disabled={lastRequestStatus} type="submit">
                    Public
                </button>
            </div>

        </div>
    );
};

export default AddProductContent;
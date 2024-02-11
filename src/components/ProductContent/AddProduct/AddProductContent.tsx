import { TextInputField } from '../../InputFields/TextInputField';
import { Fragment, useEffect } from 'react';
import EnhancedMdxEditorComponent from '../../MarkDownEditor/EnhancedMdxEditorComponent';
import { CategoryResponse } from '../../../types/category';
import useFormikValues from '../../../hooks/useFormikValues';
import { ImageFile } from '../../../types/imageFile';
import UploadImages from '../../UploadImages/UploadImages';
import { CheckboxField } from '../../InputFields/CheckboxField';
import styles from '../../../styles/productContent.module.scss'

interface AddProductContentProps {
    setContent: (Content: string) => void;
    content: string;
    resetImages: boolean;
    setResetImages: (value: boolean) => void;
    categories?: CategoryResponse[];
    checkedCategories: { [key: string]: boolean };
    componentKey: number;
    lastRequestStatus: boolean;
}

const AddProductContent = ({
    setContent,
    content,
    resetImages,
    setResetImages,
    categories,
    checkedCategories,
    componentKey,
    lastRequestStatus
}: AddProductContentProps) => {

    const { addNewValue } = useFormikValues();

    const handleAction = () => {

        let categoriesIds: string[] = [];
        let subcategoriesIds: string[] = [];

        categories?.forEach(category => {
            if (checkedCategories[category.id]) {
                categoriesIds.push(category.id);
            }
            category.subcategories?.forEach(subcategory => {
                if (checkedCategories[subcategory.id]) {
                    subcategoriesIds.push(subcategory.id);
                }
            });
        });

        addNewValue({ categoriesIds, subcategoriesIds, content });
    };

    useEffect(() => {
        handleAction();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content, checkedCategories]);

    const getImagesData = async (files: ImageFile[]): Promise<void> => {

        if (files.length !== 0) {
            addNewValue({ images: files.map(file => file.file) });
        }
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
            <div className={styles.images}>
                <UploadImages
                    getImages={getImagesData}
                    maxNumber={10}
                    resetImages={resetImages}
                    setResetImages={setResetImages}
                    styleDrop={styles.clickDrop}
                />
            </div>
            {/* <div className={styles.images}>
                <UploadImages
                    getImages={getImagesData}
                    maxNumber={1}
                    resetImages={resetImages}
                    setResetImages={setResetImages}
                />
            </div> */}
            <div className={`${styles.columns} ${styles.checkboxContainer}`}>
                {categories?.map((category) => (
                    <div>
                        <Fragment key={category.id}>
                            <CheckboxField
                                name={category.id}
                                label={category.categoryName}
                                className={styles.checkbox}
                            />
                            {category.subcategories?.map((subcategory) => (
                                <div key={subcategory.id} className={styles.subcategories}>
                                    <CheckboxField
                                        name={subcategory.id}
                                        label={subcategory.categoryName}
                                        className={styles.checkbox}
                                    />
                                </div>
                            ))}
                        </Fragment>
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
            <div className={styles.inputField}>
                <TextInputField
                    label="price"
                    className={styles.titleField}
                    name="price"
                    id="price"
                    initialValue={''}
                />
            </div>
            <div className={styles.inputField}>
                <TextInputField
                    label="discount"
                    className={styles.titleField}
                    name="discount"
                    id="discount"
                    initialValue={''}
                />
            </div>
            <div className={styles.inputField}>
                <TextInputField
                    label="size"
                    className={styles.titleField}
                    name="size"
                    id="size"
                    initialValue={''}
                />
            </div>
            <div className={styles.inputField}>
                <TextInputField
                    label="stock"
                    className={styles.titleField}
                    name="stock"
                    id="stock"
                    initialValue={''}
                />
            </div>
            <div className={styles.inputField}>
                <TextInputField
                    label="location"
                    className={styles.titleField}
                    name="location"
                    id="location"
                    initialValue={''}
                />
            </div>
            <div className={styles.buttonPublic}>
                <button disabled={lastRequestStatus} type="submit">
                    Public
                </button>
            </div>

        </div>
    );
};

export default AddProductContent;
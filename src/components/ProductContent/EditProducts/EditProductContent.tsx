import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { TextInputField } from '../../InputFields/TextInputField';
import UploadImages from '../../UploadImages/UploadImages';
import EnhancedMdxEditorComponent from '../../MarkDownEditor/EnhancedMdxEditorComponent';
import { CheckboxField } from '../../InputFields/CheckboxField';
import useFormikValues from '../../../hooks/useFormikValues';
import { useCheckboxContext } from '../../../context/checkboxProvider';
import { CategoryResponse } from '../../../types/category';
import { ImageFile } from '../../../types/imageFile';
import { removePartFromUrl } from '../../../utils/helpers/removePartFromUrl/removePartFromUrl';
import { UrlToImages } from '../../../constants/imageConst';
import imageStyles from '../../../styles/uploadImages.module.scss';
import { Product } from '../../../types/product';
import smallUploadImages from '../../../styles/smallUploadImages.module.scss';
import styles from '../../../styles/edit.module.scss';

interface EditProductPropertyProps extends Product {
    disabled: boolean;
    resetImages: boolean;
    setResetImages: (value: boolean) => void;
    categoriesIds?: string[];
    categories?: CategoryResponse[];
    resetCheckedCategories: () => void
}

const EditProductProperty: FunctionComponent<EditProductPropertyProps> = ({
        id,
        title,
        content,
        imageSrc,
        itemSrc,
        price,
        discount,
        location,
        size,
        stock,
        disabled,
        resetImages,
        setResetImages,
        categoriesIds,
        categories,
        resetCheckedCategories,
    }) => {
    const { addNewValue, values } = useFormikValues<Product[]>();
    const copyValues = values as unknown as Product;

    const imageName = imageSrc?.map(url => removePartFromUrl(url, UrlToImages));
    console.log(imageName);

    const [postValues, setPostValues] = useState({
        id,
        title,
        content,
        imageSrc,
        itemSrc,
        price,
        discount,
        location,
        size,
        stock,
    });

    const { checkedCategories, setCheckedCategories } = useCheckboxContext();

    useEffect(() => {
        addNewValue({ categoriesIds: Object.keys(checkedCategories).filter(key => checkedCategories[key]) });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedCategories]);

    useEffect(() => {
        resetCheckedCategories()
        categoriesIds?.forEach(id => {
            setCheckedCategories(prev => ({ ...prev, [id]: true }));
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

    const getSmallImagesData = async (files: ImageFile[]): Promise<void> => {
        addNewValue({ itemsImages: files.map(file => file.file) });
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
            <div className={styles.choseImage}>
                <UploadImages
                    getImages={getSmallImagesData}
                    maxNumber={10}
                    resetImages={resetImages}
                    setResetImages={setResetImages}
                    styles={smallUploadImages}
                />
            </div>
            <div className={`${styles.columns} ${styles.checkboxContainer}`}>
                {categories?.map((category) => (
                    <div key={category.id}>
                        <Fragment>
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
            <div className={styles.inputField}>
                <TextInputField
                    label="price"
                    className={styles.titleField}
                    name="price"
                    id="price"
                    initialValue={copyValues.price}
                />
            </div>
            <div className={styles.inputField}>
                <TextInputField
                    label="discount"
                    className={styles.titleField}
                    name="discount"
                    id="discount"
                    initialValue={copyValues.discount}
                />
            </div>
            <div className={styles.inputField}>
                <TextInputField
                    label="size"
                    className={styles.titleField}
                    name="size"
                    id="size"
                    initialValue={copyValues.size}
                />
            </div>
            <div className={styles.inputField}>
                <TextInputField
                    label="stock"
                    className={styles.titleField}
                    name="stock"
                    id="stock"
                    initialValue={copyValues.stock}
                />
            </div>
            <div className={styles.inputField}>
                <TextInputField
                    label="location"
                    className={styles.titleField}
                    name="location"
                    id="location"
                    initialValue={copyValues.location}
                />
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

export default EditProductProperty;
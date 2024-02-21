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
import styles from '../../../styles/productContent.module.scss';

interface EditProductPropertyProps extends Product {
    disabled: boolean;
    resetImages: boolean;
    setResetImages: (value: boolean) => void;
    categoriesIds?: string[];
    categories?: CategoryResponse[];
    resetCheckedCategories: () => void
}

interface ProductProps {
    title: string;
    content: string;
    price?: string;
    discount?: string;
    size?: string;
    stock?: string;
    location?: string;
}

interface ImageProps {
    images: ImageFile[]
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
    const copyValues = values as unknown as ImageProps;

    const imageName = imageSrc?.map(url => removePartFromUrl(url, UrlToImages));
    const itemName = itemSrc?.map(url => removePartFromUrl(url, UrlToImages));

    const [postValues, setPostValues] = useState<ProductProps>(() => ({
        title: title || '',
        content: content || '',
        price: price || '',
        discount: discount || '',
        location: location || '',
        size: size || '',
        stock: stock || '',
    }));

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

        addNewValue({ ...postValues, productId: id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleContentChange = (newContent: string) => {
        setPostValues(prev => ({ ...prev, content: newContent }));
        addNewValue({ content: newContent });
    };

    const handleImageChange = async (files: ImageFile[], type: 'images' | 'itemsImages') => {
        const fileData = files.map(file => file.file);
        addNewValue({ [type]: fileData });
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputTitleField}>
                <TextInputField
                    label="Title"
                    className={styles.titleField}
                    name="title"
                    id="title"
                    initialValue={postValues.title}
                />
            </div>
            <div className={`${copyValues.images?.length > 0 ? styles.images : styles.imageHeight}`}>
                <UploadImages
                    getImages={(files) => handleImageChange(files, 'images')}
                    maxNumber={10}
                    resetImages={resetImages}
                    setResetImages={setResetImages}
                    initialImages={imageSrc}
                    styleDrop={styles.clickDrop}
                    styles={imageStyles}
                />
            </div>
            <div className={styles.choseImage}>
                <UploadImages
                    getImages={(files) => handleImageChange(files, 'itemsImages')}
                    maxNumber={10}
                    resetImages={resetImages}
                    setResetImages={setResetImages}
                    initialImages={itemSrc}
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
            <EnhancedMdxEditorComponent
                content={postValues.content || ''}
                setContent={handleContentChange}
                width='100%'
            />
            {Object.keys(postValues).map((key) =>
                (key !== 'content' && key !== 'title') && (
                    <div key={key} className={styles.inputField}>
                        <TextInputField
                            label={key}
                            className={styles.titleField}
                            name={key}
                            id={key}
                            initialValue={postValues[key as keyof ProductProps] || ''}
                        />
                    </div>
                )
            )}

            <div className={styles.buttonPublic}>
                <button disabled={disabled} type="submit">Publish</button>
            </div>
        </div>
    );
};

export default EditProductProperty;
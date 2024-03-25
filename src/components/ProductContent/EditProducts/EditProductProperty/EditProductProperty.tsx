import { FunctionComponent, useEffect, useState } from 'react';
import { TextInputField } from '../../../InputFields/TextInputField';
import UploadImages from '../../../UploadImages/UploadImages';
import EnhancedMdxEditorComponent from '../../../MarkDownEditor/EnhancedMdxEditorComponent';
import useFormikValues from '../../../../hooks/useFormikValues';
import { useCheckboxContext } from '../../../../context/checkboxProvider';
import { ImageFile } from '../../../../types/imageFile';
import { removePartFromUrl } from '../../../../utils/helpers/removePartFromUrl/removePartFromUrl';
import { UrlToImages } from '../../../../constants/imageConst';
import { CategoryResponse } from '../../../../types/category';
import { Product } from '../../../../types/product';
import { Attributes } from '../../../../types/attributes';
import Checkboxes from '../Checkboxes/Checkboxes';
import imageStyles from '../../../../styles/uploadImages.module.scss';
import styles from '../../../../styles/productContent.module.scss';
import { filterIds } from '../../../../utils/helpers/filterIds/filterIds';

interface EditProductPropertyProps extends Product {
    disabled: boolean;
    resetImages: boolean;
    setResetImages: (value: boolean) => void;
    checkedCategoryIds?: IdProps[];
    checkedSubcategoryIds?: IdProps[];
    categories?: CategoryResponse[];
    checkedAttributesIds?: IdProps[];
    attributes?: Attributes[];
    resetChecked: () => void
}

interface ProductProps {
    title: string;
    content: string;
    price?: string;
    discount?: string;
    stock?: string;
    location?: string;
}

interface ImageProps {
    images: ImageFile[]
}

interface IdProps {
    id: string;
}

const EditProductProperty: FunctionComponent<EditProductPropertyProps> = ({
    id,
    title,
    content,
    imageSrc,
    price,
    discount,
    location,
    stock,
    disabled,
    resetImages,
    setResetImages,
    checkedCategoryIds,
    checkedSubcategoryIds,
    checkedAttributesIds,
    categories,
    attributes,
    resetChecked,
}) => {
    const { addNewValue, values } = useFormikValues<Product[]>();
    const { checked, setChecked } = useCheckboxContext();
    const [postValues, setPostValues] = useState<ProductProps>(() => ({
        title: title || '',
        content: content || '',
        price: price || '',
        discount: discount || '',
        location: location || '',
        stock: stock || '',
    }));

    const copyValues = values as unknown as ImageProps;

    useEffect(() => {

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categories, attributes]);

    useEffect(() => {
        resetChecked()
        const allIds = [
            ...(checkedCategoryIds?.map(obj => obj.id) || []),
            ...(checkedSubcategoryIds?.map(obj => obj.id) || []),
            ...(checkedAttributesIds?.map(obj => obj.id) || [])
        ];

        allIds?.forEach(id => {
            setChecked(prev => ({ ...prev, [id]: true }));
        });

        addNewValue({
            ...postValues,
            productId: id,
            imagesNames: imageSrc?.map(url => removePartFromUrl(url, UrlToImages)),
            categoriesIds: filterIds(checkedCategoryIds || []),
            subcategoriesIds: filterIds(checkedSubcategoryIds || []),
            attributesIds: filterIds(checkedAttributesIds || [])
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleContentChange = (newContent: string) => {
        setPostValues(prev => ({ ...prev, content: newContent }));
        addNewValue({ content: newContent });
    };

    const handleImageChange = async (files: ImageFile[], type: 'images') => {
   
        const indicesWithFile = files.map((file, index) => file.file !== undefined ? index : -1).filter(index => index !== -1);
        const filesWithFile = files.filter(file => file.file !== undefined);
        const filesWithoutFile = files.filter(file => file.file === undefined && file.data_url !== undefined);
        const urls = filesWithoutFile.map(file => removePartFromUrl(file.data_url as string, UrlToImages));
        const fileData = filesWithFile.map(file => file.file);
        addNewValue({ [type]: fileData, imagesNames: urls, imagesFilesIndices:indicesWithFile } );
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
            <Checkboxes categories={categories} attributes={attributes} />
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
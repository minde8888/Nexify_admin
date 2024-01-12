import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { TextInputField } from '../../InputFields/TextInputField';
import UploadImage from '../../UploadImage/UploadImage';
import PropertyImagePreview from '../../PropertyImagePreview/PropertyImagePreview';
import EnhancedMdxEditorComponent from '../../MarkDownEditor/EnhancedMdxEditorComponent';
import { CategoryResponse, SubcategoryResponse } from '../../../types/category';
import useFormikValues from '../../../hooks/useFormikValues';
import { ImageFile } from '../../../types/imageFile';
import CategoryFormProperty from '../../../types/categoryFormProperty';
import { isEmptyString } from '../../../utils/helpers/isEmptyString';
import { removePartFromUrl } from '../../../utils/helpers/removePartFromUrl';
import { UrlToImages } from '../../../constants/imageConst';
import styles from './edit.module.scss';

interface CustomFormValues {
  categoryName: string;
  description: string;
  imageSrc: string;
}

interface EditCategoryPropertyProps {
  isCategory: boolean;
  category: CategoryResponse | SubcategoryResponse;
  categoryName: string;
}

const EditCategoryProperty: FunctionComponent<EditCategoryPropertyProps> = ({ isCategory, category, categoryName }) => {

  const { addNewValue, values } = useFormikValues<CustomFormValues[]>();

  let newValues = values as unknown as CustomFormValues;

  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<ImageFile[]>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [catValues, setCatValues] = useState<CategoryFormProperty>(initialFormState);

  useEffect(() => {
    const imageName = file.length === 0 && !isEmptyString(imagePreviewUrl)
      ? removePartFromUrl(imagePreviewUrl, UrlToImages)
      : null;

    addNewValue({ ...catValues, description: content, imageName, image: file, imageSrc: imagePreviewUrl });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, file, catValues, imagePreviewUrl]);

  useEffect(() => {
    if (category) {
      const initialValues = mapCategoryToFormValues(category, isCategory, categoryName);
      setCatValues(initialValues);
      setContent(initialValues.description || '');
      setImagePreviewUrl(initialValues.imageSrc || '');
    }
  }, [category, categoryName, isCategory]);

  const handleAddImage = useCallback((newFile: ImageFile[]) => setFile(newFile), []);

  return (
    <div className={styles.editCategoryContainer}>
      <TextInputField
        className={styles.titleField}
        name="categoryName"
        label="Category Name"
        id="categoryName"
        placeholder="Enter category name"
        initialValue={newValues.categoryName}
      />
      <PropertyImagePreview imagePreviewUrl={imagePreviewUrl} />
      <UploadImage setImagePreviewUrl={setImagePreviewUrl} handleAddImage={handleAddImage} />
      <EnhancedMdxEditorComponent content={content} setContent={setContent} width="95%" />
      <div className={styles.saveButton}>
        <button disabled={isDisabled} type="submit">Save</button>
      </div>
    </div>
  );
};

const initialFormState = {
  id: '',
  categoryName: '',
  description: '',
  imageName: '',
  accept: true
};

const mapCategoryToFormValues = (
  category: CategoryResponse | SubcategoryResponse,
  isCategory: boolean,
  categoryName: string): CategoryFormProperty => ({
    id: category.id,
    categoryName: categoryName,
    description: category.description,
    imageName: category.imageSrc,
    accept: isCategory
  });

const isDisabled = true;

export default EditCategoryProperty;

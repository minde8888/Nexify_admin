import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { CategoryResponse } from '../../../types/category';
import { useModal } from '../../../hooks/useModel';
import Category from './Category';
import EditPropertyModal from './EditPropertyModal';
import { findCategoryById, findSubcategoryById } from '../../../utils/helpers/categoryById';
import CategoryFormProperty from '../../../types/categoryFormProperty';
import useFormikValues from '../../../hooks/useFormikValues';
import { ImageFile } from '../../../types/imageFile';
import styles from './edit.module.scss';

interface EditPropertyProps {
  categories: CategoryResponse[];
  dispatch: Dispatch<AnyAction>;
}

const EditProperty: FunctionComponent<EditPropertyProps> = ({ categories, dispatch }) => {
  const { isOpen, toggle } = useModal();

  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<ImageFile[]>([]);
  const [original, setOriginal] = useState({ categoryName: '', imageSrc: '' });
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [values, setValues] = useState<CategoryFormProperty>({
    id: '',
    categoryName: '',
    description: '',
  });

  const { addNewValue } = useFormikValues('categoryName');

  useEffect(() => {
    setValues((prevValues) => ({ ...prevValues, categoryName: original.categoryName }));
    setImagePreviewUrl(original.imageSrc);   
  }, [original]);

  useEffect(() => {
    addNewValue({ id: values.id, description: content, image: file });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.id, content, file]);

  const handleEdit = useCallback((id: string) => {
    toggle();
    const category = findCategoryById(id, categories);
    const subcategory = findSubcategoryById(id, categories);
    const updatedValues: CategoryFormProperty = {
      id: category?.categoryId || subcategory?.subCategoryId || '',
      categoryName: category?.categoryName || subcategory?.subCategoryName || '',
      description: category?.description || subcategory?.description || '',
      imageSrc: category?.imageSrc || subcategory?.imageSrc || '',
    };

    setOriginal({ categoryName: updatedValues.categoryName || '', imageSrc: updatedValues.imageSrc || '' });
    setValues(updatedValues);
    setContent(updatedValues.description || '');
  }, [toggle, categories]);

  const onRemove = useCallback((id: string) => {
    console.log('onRemove', id);
  }, []);

  const handleAddImage = useCallback((newFile: ImageFile[]) => {
    setFile(newFile);
  }, []);

  const handleCancel = useCallback(() => {
    toggle();
  }, [toggle]);

  return (
    <div className={styles.editPropertyContainer}>
      <EditPropertyModal
        isOpen={isOpen}
        toggle={toggle}
        onCancel={handleCancel}
        categoryName={values.categoryName}
        content={content}
        setContent={setContent}
        handleAddImage={handleAddImage}
        setImagePreviewUrl={setImagePreviewUrl}
        imagePreviewUrl={imagePreviewUrl}
      />
      {Object.values(categories).map((category) => (
        <Category
          key={category.categoryId}
          category={category}
          onEdit={handleEdit}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default EditProperty;

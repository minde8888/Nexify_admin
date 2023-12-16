import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Dispatch, AnyAction } from '@reduxjs/toolkit';
import { CategoryResponse } from '../../../types/category';
import { useModal } from '../../../hooks/useModel';
import Category from './Category';
import EditPropertyModal from './EditPropertyModal';
import { findCategoryById, findSubcategoryById } from '../../../utils/helpers/categoryUtils';
import styles from './edit.module.scss';
import CategoryFormProperty from '../../../types/categoryFormProperty';
import useFormikValues from '../../../hooks/useFormikValues';
import { ImageFile } from '../../../types/imageFile';

interface EditPropertyProps {
  categories: CategoryResponse[];
  dispatch: Dispatch<AnyAction>;
}

const EditProperty: FunctionComponent<EditPropertyProps> = ({ categories, dispatch }) => {
  const { addNewValue } = useFormikValues<CategoryFormProperty>('values');
  const { isOpen, toggle } = useModal();
  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<ImageFile[]>([]);

  const [values, setValues] = useState<CategoryFormProperty>({
    id: '',
    categoryName: '',
    description: '',
  });

  const handleEdit = useCallback((id: string) => {
    toggle();
    const category = findCategoryById(id, categories);
    const subcategory = findSubcategoryById(id, categories);
    const updatedValues: CategoryFormProperty = {
      id: category?.categoryId || subcategory?.subCategoryId || '',
      categoryName: category?.categoryName || subcategory?.subCategoryName || '',
      description: category?.description || subcategory?.description || ''
    };
    setValues(updatedValues);
    setContent(updatedValues.description || '');
  }, [toggle, categories]);

  const onRemove = useCallback((id: string) => {
    console.log('onRemove', id);
  }, []);

  const handleAddImage = (file: ImageFile[]) => setFile(file);

  useEffect(() => {    
    addNewValue({ ...values, description: content, image: file });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, content, file]);

  return (
    <div className={styles.editPropertyContainer}>
      <EditPropertyModal
        isOpen={isOpen}
        toggle={toggle}
        onCancel={toggle}
        categoryName={values.categoryName}
        content={content}
        setContent={setContent}
        handleAddImage={handleAddImage}
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

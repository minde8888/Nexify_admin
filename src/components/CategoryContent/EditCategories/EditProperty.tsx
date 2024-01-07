import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { CategoryResponse } from '../../../types/category';
import { useModal } from '../../../hooks/useModel';
import Category from './Category';
import EditPropertyModal from './EditPropertyModal';
import { findCategoryById, findSubcategoryById } from '../../../utils/helpers/categoryById';
import CategoryFormProperty from '../../../types/categoryFormProperty';
import useFormikValues from '../../../hooks/useFormikValues';
import { ImageFile } from '../../../types/imageFile';
import styles from './edit.module.scss';
import { deleteAction } from '../../../redux/actions/actions';
import { useAppDispatch } from '../../../hooks/useRedux';

interface EditPropertyProps {
  categories: CategoryResponse[];
  disabled: boolean;
  URL: string;
}

const EditProperty: FunctionComponent<EditPropertyProps> = ({ categories, disabled, URL }) => {
  const dispatch = useAppDispatch();
  const { isOpen, toggle } = useModal();

  const [content, setContent] = useState<string>('');
  const [file, setFile] = useState<ImageFile[]>([]);

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [values, setValues] = useState<CategoryFormProperty>({
    id: '',
    categoryName: '',
    description: '',
    accept: true
  });

  const { addNewValue } = useFormikValues();

  useEffect(() => {
    addNewValue({
      id: values.id,
      description: content,
      image: file,
      accept: values.accept,
      imageSrc: imagePreviewUrl
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.id, content, file, values.accept]);

  const handleEdit = useCallback((id: string) => {
    toggle();

    const category = findCategoryById(id, categories);
    const subcategory = findSubcategoryById(id, categories);
    const updatedValues: CategoryFormProperty = {
      id: category?.id || subcategory?.Id || '',
      categoryName: category?.categoryName || subcategory?.subCategoryName || '',
      description: category?.description || subcategory?.description || '',
      imageSrc: category?.imageSrc || subcategory?.imageSrc || '',
      accept: category ? true : false
    };
    addNewValue({ categoryName: updatedValues.categoryName ?? '' });
    setImagePreviewUrl(updatedValues.imageSrc || '');
    setValues(updatedValues);
    setContent(updatedValues.description || '');
  }, [toggle, categories, addNewValue]);

  const onRemove = useCallback((id: string) => {
    const bool = categories.some((category) => category.id === id);
    dispatch(deleteAction(URL, id, bool))
  }, [URL, categories, dispatch]);

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
        content={content}
        setContent={setContent}
        categoryName={values.categoryName}
        handleAddImage={handleAddImage}
        setImagePreviewUrl={setImagePreviewUrl}
        imagePreviewUrl={imagePreviewUrl}
        disabled={disabled}
      />
      {Object.values(categories).map((category, index) => (
        <Category
          key={index}
          category={category}
          onEdit={handleEdit}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default EditProperty;

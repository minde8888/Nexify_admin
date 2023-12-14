import React, { FunctionComponent, useCallback, useState } from "react";
import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import { CategoryResponse } from "../../../types/category";
import { useModal } from "../../../hooks/useModel";
import Category from "./Category";
import EditPropertyModal from "./EditPropertyModal";
import { findCategoryById, findSubcategoryById } from "../../../utils/helpers/categoryUtils";
import styles from './edit.module.scss';
import CategoryFormProperty from "../../../types/categoryFormProperty";

interface EditPropertyProps {
  categories: CategoryResponse[];
  dispatch: Dispatch<AnyAction>;
  handleChange: (newValues: CategoryFormProperty) => void;
  resetForm: () => void;
}

interface Values {
  id: string;
  categoryName: string;
  description?: string;
}

const EditProperty: FunctionComponent<EditPropertyProps> = ({
  categories,
  dispatch,
  handleChange,
  resetForm
}) => {
  const { isOpen, toggle } = useModal();

  const [values, setValues] = useState<Values>({
    id: '',
    categoryName: '',
    description: '',
  });

  const [content, setContent] = useState<string>('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

  const handleEdit = useCallback((id: string) => {
    toggle();

    const category = findCategoryById(id, categories);
    const subcategory = findSubcategoryById(id, categories);

    const updatedValues: Values = {
      id: category?.categoryId || subcategory?.subCategoryId || '',
      categoryName: category?.categoryName || subcategory?.subCategoryName || '',
      description: category?.description || subcategory?.description || '',
    };

    setValues(updatedValues);
    setContent(updatedValues.description || '');
    handleChange({ ...updatedValues, properties: [], "": "" });
  }, [categories, toggle, setValues, handleChange]);

  const onRemove = useCallback((id: string) => {
    console.log('====================================');
    console.log('onRemove', id);
    console.log('====================================');
  }, []);

  return (
    <div className={styles.editPropertyContainer}>
      <EditPropertyModal
        isOpen={isOpen}
        toggle={toggle}
        onCancel={() => toggle()}
        initialValue={values.categoryName}
        id={values.id}
        content={content}
        setContent={setContent}
        imagePreviewUrl={imagePreviewUrl}
        setImagePreviewUrl={setImagePreviewUrl}
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

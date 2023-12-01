import { useCallback } from 'react';
import DynamicFormProperty from '../types/categoryFormProperty';
import { submitCategory } from '../api/categoryAPI';

function useDynamicForm() {
    const initialValues: DynamicFormProperty = {
        categoryName: '',
        properties: [],
        id: '',
        description: '',
        image: [],
        "": ''
    };

    const handleSubmit = useCallback((values: DynamicFormProperty) => {
        // console.log('====================================');
        console.log('values', values);
        // console.log('====================================');

        const formData = new FormData();
        const categoryList = values.properties || [];

        categoryList.forEach((category, categoryIndex) => {
            processCategory(formData, category, categoryIndex);
        });

        // objectToFormData(values.properties[0], formData);
        console.log(Object.fromEntries(formData));
        submitCategory(formData);
    }, []);

    return {
        initialValues,
        handleSubmit
    };
}

export default useDynamicForm;

interface CategoryFormProperty extends DynamicFormProperty {
    properties: DynamicFormProperty[];
}

function appendFormData(formData: FormData, key: string, value: any): void {
  if (value !== undefined && value !== null) {
      formData.append(key, value);
  }
}

function processCategory(formData: FormData, category: DynamicFormProperty, categoryIndex: number): void {
  const categoryDtoKey = `categories[${categoryIndex}]`;

  appendFormData(formData, `${categoryDtoKey}.categoryId`, category.id);
  appendFormData(formData, `${categoryDtoKey}.categoryName`, category['']);
  appendFormData(formData, `${categoryDtoKey}.description`, category.description);
  appendFormData(formData, `${categoryDtoKey}.image`, category.image);

  category.properties.forEach((subcategory, subcategoryIndex) => {
      const subcategoryDtoKey = `${categoryDtoKey}.subcategories[${subcategoryIndex}]`;

      appendFormData(formData, `${subcategoryDtoKey}.subCategoryId`, subcategory.id);
      appendFormData(formData, `${subcategoryDtoKey}.subCategoryName`, subcategory['']);
      appendFormData(formData, `${subcategoryDtoKey}.description`, subcategory.description);
      appendFormData(formData, `${subcategoryDtoKey}.image`, subcategory.image);
  });
}


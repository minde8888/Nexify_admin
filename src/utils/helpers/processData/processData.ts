import { Attributes } from '../../../types/attributes';
import CategoryFormProperty from '../../../types/categoryFormProperty';

const appendFormData = (formData: FormData, key: string, value?: string): void => {
    if (value !== undefined && value !== null) {
        formData.append(key, value);
    }
};

export const processCategory = (formData: FormData, category: CategoryFormProperty, categoryIndex: number, id?: string): void => {
    
    const categoryDtoKey = `categories[${categoryIndex}]`;

    if (id) {
        appendFormData(formData, `${categoryDtoKey}.categoryId`, id);
    }

    appendFormData(formData, `${categoryDtoKey}.categoryName`, category['']);

    (category.properties ?? []).forEach((subcategory, subcategoryIndex) => {
        const subcategoryDtoKey = `${categoryDtoKey}.subcategories[${subcategoryIndex}]`;
        appendFormData(formData, `${subcategoryDtoKey}.categoryName`, subcategory['']);
    });
};

export const processAttribute = (formData: FormData, attribute: Attributes, index: number): void => {
    const categoryDtoKey = `attributes[${index}]`;
    appendFormData(formData, `${categoryDtoKey}.attributeName`, attribute['']);
};

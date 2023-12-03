import CategoryFormProperty from '../../types/categoryFormProperty';

const appendFormData = (formData: FormData, key: string, value?: string): void => {
    if (value !== undefined && value !== null) {
        formData.append(key, value);
    }
};

export const processCategory = (formData: FormData, category: CategoryFormProperty, categoryIndex: number): void =>{
    const categoryDtoKey = `categories[${categoryIndex}]`;

    appendFormData(formData, `${categoryDtoKey}.categoryId`, category.id);
    appendFormData(formData, `${categoryDtoKey}.categoryName`, category['']);
    appendFormData(formData, `${categoryDtoKey}.description`, category.description);

    if (category.image && category.image[0]?.file) {
        formData.append(`${categoryDtoKey}.image`, category.image[0].file);
    }

    category.properties.forEach((subcategory, subcategoryIndex) => {
        const subcategoryDtoKey = `${categoryDtoKey}.subcategories[${subcategoryIndex}]`;

        appendFormData(formData, `${subcategoryDtoKey}.subCategoryId`, subcategory.id);
        appendFormData(formData, `${subcategoryDtoKey}.subCategoryName`, subcategory['']);
        appendFormData(formData, `${subcategoryDtoKey}.description`, subcategory.description);

        if (subcategory.image && subcategory.image[0]?.file) {
            formData.append(`${subcategoryDtoKey}.image`, subcategory.image[0].file);
        }
    });
}

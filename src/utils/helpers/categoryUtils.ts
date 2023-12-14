import { CategoryResponse, SubcategoryResponse } from '../../types/category';

export const findCategoryById = (categoryId: string, categories: CategoryResponse[]): CategoryResponse | undefined => {
    return Object.values(categories).find((category) => category.categoryId === categoryId);
};

export const findSubcategoryById = (subCategoryId: string, categories: CategoryResponse[]): SubcategoryResponse | undefined => {
    const allSubcategories = Object.values(categories).flatMap((category) => category.subcategories || []);
    return allSubcategories.find((subcategory) => subcategory.subCategoryId === subCategoryId);
};

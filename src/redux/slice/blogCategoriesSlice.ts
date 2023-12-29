import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryResponse } from '../../types/category';
import CategoryFormProperty from '../../types/categoryFormProperty';
import { findIndexById } from '../../utils/helpers/findIndexById';

const blogCategoriesSlice = createSlice({
    name: 'blogCategories',
    initialState: [] as CategoryResponse[],

    reducers: {
        getCategories: (state, action: PayloadAction<CategoryResponse[]>) => {
            return action.payload;
        },

        updateCategory: (state: CategoryResponse[], action: PayloadAction<CategoryFormProperty>) => {
            const updatedCategory = action.payload;

            const categoryIndex = findIndexById(state, updatedCategory.id, 'categoryId');

            if (categoryIndex !== -1) {
                 (state[categoryIndex] = { ...state[categoryIndex], ...updatedCategory });
            }
        },

        updateSubcategory: (state: CategoryResponse[], action: PayloadAction<CategoryFormProperty>) => {
            const updatedSubcategory = action.payload;

            state.forEach((category) => {
                const subcategoryIndex = findIndexById(category.subcategories, updatedSubcategory.id, 'subCategoryId');

                if (subcategoryIndex !== -1) {
                    category.subcategories[subcategoryIndex] = {
                        ...category.subcategories[subcategoryIndex],
                        ...updatedSubcategory
                    };
                }
            });
        },

        removeCategory: (state: CategoryResponse[], action: PayloadAction<string>) => {
            const categoryId = action.payload;

            const categoryIndex = findIndexById(state, categoryId, 'categoryId');

            if (categoryIndex !== -1) {
                state.splice(categoryIndex, 1);
            }
        },

        removeSubcategory: (state, action: PayloadAction<string>) => {
            const subcategoryId = action.payload;

            state.forEach((category) => {
                const subcategoryIndex = category.subcategories.findIndex((item) => item.subCategoryId === subcategoryId);

                if (subcategoryIndex !== -1) {
                    category.subcategories.splice(subcategoryIndex, 1);
                }
            });
        }
    }
});

export const { getCategories, updateCategory, updateSubcategory, removeCategory, removeSubcategory } = blogCategoriesSlice.actions;

export default blogCategoriesSlice.reducer;

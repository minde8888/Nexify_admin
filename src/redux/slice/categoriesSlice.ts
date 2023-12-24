import { remove } from './../../middleware/remove';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryResponse } from '../../types/category';
import CategoryFormProperty from '../../types/categoryFormProperty';

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {} as CategoryResponse[],
    reducers: {
        getCategories: (state, action: PayloadAction<CategoryResponse[]>) => {
            return {
                ...state,
                ...action.payload
            };
        },
        updateCategory: (state, action: PayloadAction<CategoryFormProperty>) => {
            const category = action.payload;
            // const index = state.findIndex((item) => item.categoryId === category.id);
            console.log('====================================');
            console.log('category', category);
            console.log('====================================');
            // if (index !== -1) {
            //     state[index] = category;
            // }
        },
        updateSubcategory: (state, action: PayloadAction<CategoryFormProperty>) => {
            const subcategory = action.payload;

            console.log('====================================');
            console.log('subcategory', subcategory);
            console.log('====================================');
            // const categoryIndex = state.findIndex((item) => item.subcategories.some((sub) => sub.subCategoryId === subcategory.id));

            // if (categoryIndex !== -1) {
            //     const subcategoryIndex = state[categoryIndex].subcategories.findIndex((item) => item.subCategoryId === subcategory.id);

            //     if (subcategoryIndex !== -1) {
            //         const categoryId = state[categoryIndex].categoryId;
            //         const updatedSubcategory = { ...subcategory, categoryId };
            //         state[categoryIndex].subcategories[subcategoryIndex] = updatedSubcategory;
            //     }
            // }
        },

        removeCategory: (state, action: PayloadAction<string>) => {
            const categoryId = action.payload;
            const index = state.findIndex((item) => item.categoryId === categoryId);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        removeSubcategory: (state, action: PayloadAction<string>) => {
            const subcategoryId = action.payload;
            const categoryIndex = state.findIndex((item) => item.subcategories.some((sub) => sub.subCategoryId === subcategoryId));

            if (categoryIndex !== -1) {
                const subcategoryIndex = state[categoryIndex].subcategories.findIndex((item) => item.subCategoryId === subcategoryId);

                if (subcategoryIndex !== -1) {
                    state[categoryIndex].subcategories.splice(subcategoryIndex, 1);
                }
            }
        }
    }
});

export const { getCategories, updateCategory, updateSubcategory, removeCategory, removeSubcategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;

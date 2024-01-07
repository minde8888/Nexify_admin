import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryResponse } from '../../types/category';
import CategoryFormProperty from '../../types/categoryFormProperty';
import { findIndexById } from '../../utils/helpers/findIndexById';

const blogCategoriesSlice = createSlice({
    name: 'blogCategories',
    initialState: [] as CategoryResponse[],

    reducers: {
        getPostCategories: (state, action: PayloadAction<CategoryResponse[]>) => {
            return action.payload;
        },

        updatePostCategory: (state: CategoryResponse[], action: PayloadAction<CategoryFormProperty>) => {
            const updatedCategory = action.payload;

            const categoryIndex = findIndexById(state, updatedCategory.id, 'id');

            if (categoryIndex !== -1) {
                 (state[categoryIndex] = { ...state[categoryIndex], ...updatedCategory });
            }
        },

        removePostCategory: (state: CategoryResponse[], action: PayloadAction<string>) => {
            const categoryId = action.payload;

            const categoryIndex = findIndexById(state, categoryId, 'id');

            if (categoryIndex !== -1) {
                state.splice(categoryIndex, 1);
            }
        },
    }
});

export const { getPostCategories, updatePostCategory, removePostCategory } = blogCategoriesSlice.actions;

export default blogCategoriesSlice.reducer;

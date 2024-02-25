import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryResponse } from '../../../types/category';
import CategoryFormProperty from '../../../types/categoryFormProperty';
import { findIndexById } from '../../../utils/helpers/findIndexById/findIndexById';

interface CategoriesState {
    data: CategoryResponse[];
    lastRequestStatus: boolean | null;
}

const initialState: CategoriesState = {
    data: [],
    lastRequestStatus: null
};

const blogCategoriesSlice = createSlice({
    name: 'blogCategories',
    initialState,

    reducers: {
        getPostCategories: (state, action: PayloadAction<CategoryResponse[]>) => {
            state.data = action.payload;
            state.lastRequestStatus = null;
            return state;
        },

        updatePostCategory: (state, action: PayloadAction<CategoryFormProperty>) => {
            state.lastRequestStatus = false;
            const updatedCategory = action.payload;

            const categoryIndex = findIndexById(state.data, updatedCategory.id, 'id');
            if (categoryIndex !== -1) {
                state.data[categoryIndex] = { ...state.data[categoryIndex], ...updatedCategory };
                return state;
            }
            return state;
        },

        removePostCategory: (state, action: PayloadAction<string>) => {
            const categoryId = action.payload;
            const categoryIndex = findIndexById(state.data, categoryId, 'id');
            if (categoryIndex !== -1) {
                state.data.splice(categoryIndex, 1);
                return state;
            }
            return state;
        },

        requestBlogCategoryStatus: (state, action: PayloadAction<boolean>) => {
            state.lastRequestStatus = action.payload;
            return state;
        }
    }
});

export const { getPostCategories, updatePostCategory, removePostCategory, requestBlogCategoryStatus } = blogCategoriesSlice.actions;

export default blogCategoriesSlice.reducer;

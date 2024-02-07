import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryResponse } from '../../../types/category';
import CategoryFormProperty from '../../../types/categoryFormProperty';
import { findIndexById } from '../../../utils/helpers/findIndexById';

interface CategoriesState {
    data: CategoryResponse[];
    lastRequestStatus: boolean | null;
}

const initialState: CategoriesState = {
    data: [],
    lastRequestStatus: null
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,

    reducers: {
        getCategories: (state, action: PayloadAction<CategoryResponse[]>) => {
            state.data = action.payload;
            state.lastRequestStatus = null;
            return state;
        },

        updateCategory: (state, action: PayloadAction<CategoryFormProperty>) => {
            state.lastRequestStatus = false;
            const updatedCategory = action.payload;
            const categoryIndex = findIndexById(state.data, updatedCategory.id, 'id');
            if (categoryIndex !== -1) {
                state.data[categoryIndex] = { ...state.data[categoryIndex], ...updatedCategory };
                return state;
            }
            return state;
        },

        updateSubcategory: (state, action: PayloadAction<CategoryFormProperty>) => {
            state.lastRequestStatus = false;
            const updatedSubcategory = action.payload;

            state.data.forEach((category) => {
                const subcategoryIndex = findIndexById(category.subcategories, updatedSubcategory.id, 'id');
                if (subcategoryIndex !== -1) {
                    category.subcategories[subcategoryIndex] = { ...category.subcategories[subcategoryIndex], ...updatedSubcategory };
                    return state;
                }
            });
            return state;
        },

        removeCategory: (state, action: PayloadAction<string>) => {
            const categoryId = action.payload;
            const categoryIndex = findIndexById(state.data, categoryId, 'id');
            if (categoryIndex !== -1) {
                state.data.splice(categoryIndex, 1);
                return state;
            }
            return state;
        },

        removeSubcategory: (state, action: PayloadAction<string>) => {
            const subcategoryId = action.payload;
            state.data.forEach((category) => {
                const subcategoryIndex = category.subcategories.findIndex((item) => item.id === subcategoryId);
                if (subcategoryIndex !== -1) {
                    category.subcategories.splice(subcategoryIndex, 1);
                    return state;
                }
            });
            return state;
        },

        requestCategoryStatus: (state, action: PayloadAction<boolean>) => {
            state.lastRequestStatus = action.payload;
            return state;
        }
    }
});

export const { getCategories, updateCategory, updateSubcategory, removeCategory, removeSubcategory, requestCategoryStatus } = categoriesSlice.actions;

export default categoriesSlice.reducer;

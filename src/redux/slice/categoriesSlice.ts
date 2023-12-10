import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryResponse, SubcategoryResponse } from '../../types/category';

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
        updateCategory: (state, action: PayloadAction<CategoryResponse>) => {
            const category = action.payload;
            const index = state.findIndex((item) => item.categoryId === category.categoryId);
            if (index !== -1) {
                state[index] = category;
            }
        },
        updateSubcategory: (state, action: PayloadAction<SubcategoryResponse>) => {
            const subcategory = action.payload;

            const categoryIndex = state.findIndex((item) => item.subcategories.some((sub) => sub.subCategoryId === subcategory.subCategoryId));
        
            if (categoryIndex !== -1) {
                const subcategoryIndex = state[categoryIndex].subcategories.findIndex((item) => item.subCategoryId === subcategory.subCategoryId);
        
                if (subcategoryIndex !== -1) {
                    const categoryId = state[categoryIndex].categoryId;
                    const updatedSubcategory = { ...subcategory, categoryId };
                    state[categoryIndex].subcategories[subcategoryIndex] = updatedSubcategory;
                }
            }
        },        
        
        removeCategory: (state, action: PayloadAction<string>) => {
            const categoryId = action.payload;
            const index = state.findIndex((item) => item.categoryId === categoryId);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    }
});

export const { getCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;

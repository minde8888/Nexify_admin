import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryResponse } from '../../types/category';
import CategoryFormProperty from '../../types/categoryFormProperty';
import { findIndexById } from '../../utils/helpers/findIndexById';

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: [] as CategoryResponse[],

    reducers: {
        getCategories: (state, action: PayloadAction<CategoryResponse[]>) => {
            return action.payload;
        },

        updateCategory: (state: CategoryResponse[], action: PayloadAction<CategoryFormProperty>) => {
            const updatedCategory = action.payload;
     
            const categoryIndex = findIndexById(state, updatedCategory.id, 'id');
   
            if (categoryIndex !== -1) {
                const newState = [...state];
                newState[categoryIndex] = { ...newState[categoryIndex], ...updatedCategory };
                return newState;
            }
            return state;
        },

        updateSubcategory: (state: CategoryResponse[], action: PayloadAction<CategoryFormProperty>) => {
            const updatedSubcategory = action.payload;
            let isUpdated = false;
            const newState = state.map((category) => {
                const subcategoryIndex = findIndexById(category.subcategories, updatedSubcategory.id, 'id');

                if (subcategoryIndex !== -1) {
                    isUpdated = true;
                    return {
                        ...category,
                        subcategories: category.subcategories.map((subcat, index) => 
                            index === subcategoryIndex ? { ...subcat, ...updatedSubcategory } : subcat
                        ),
                    };
                }
                return category;
            });

            return isUpdated ? newState : state;
        },

        removeCategory: (state: CategoryResponse[], action: PayloadAction<string>) => {
            const categoryId = action.payload;
            const categoryIndex = findIndexById(state, categoryId, 'id');

            if (categoryIndex !== -1) {
                const newState = [...state];
                newState.splice(categoryIndex, 1);
                return newState;
            }
            return state;
        },

        removeSubcategory: (state, action: PayloadAction<string>) => {
            const subcategoryId = action.payload;
            let isRemoved = false;
            const newState = state.map((category) => {
                const subcategoryIndex = category.subcategories.findIndex((item) => item.id === subcategoryId);

                if (subcategoryIndex !== -1) {
                    isRemoved = true;
                    const newSubcategories = [...category.subcategories];
                    newSubcategories.splice(subcategoryIndex, 1);
                    return { ...category, subcategories: newSubcategories };
                }
                return category;
            });

            return isRemoved ? newState : state;
        }
    }
});

export const { getCategories, updateCategory, updateSubcategory, removeCategory, removeSubcategory } = categoriesSlice.actions;

export default categoriesSlice.reducer;

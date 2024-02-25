import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Attributes } from 'react';

interface CategoriesState {
    data: Attributes;
    lastRequestStatus: boolean | null;
}

const initialState: CategoriesState = {
    data: {},
    lastRequestStatus: null
};

const attributesSlice = createSlice({
    name: 'attributesSlice',
    initialState,

    reducers: {
        getAttributes: (state, action: PayloadAction<Attributes>) => {
            state.data = action.payload;
            state.lastRequestStatus = null;
            return state;
        },

        // updatePostCategory: (state, action: PayloadAction<Attributes>) => {
        //     state.lastRequestStatus = false;
        //     const updatedCategory = action.payload;

        //     const categoryIndex = findIndexById(state.data, updatedCategory.id, 'id');
        //     if (categoryIndex !== -1) {
        //         state.data[categoryIndex] = { ...state.data[categoryIndex], ...updatedCategory };
        //         return state;
        //     }
        //     return state;
        // },

        // removePostCategory: (state, action: PayloadAction<string>) => {
        //     const categoryId = action.payload;
        //     const categoryIndex = findIndexById(state.data, categoryId, 'id');
        //     if (categoryIndex !== -1) {
        //         state.data.splice(categoryIndex, 1);
        //         return state;
        //     }
        //     return state;
        // },

        requestAttributesStatus: (state, action: PayloadAction<boolean>) => {
            state.lastRequestStatus = action.payload;
            return state;
        }
    }
});

export const { getAttributes, requestAttributesStatus } = attributesSlice.actions;

export default attributesSlice.reducer;

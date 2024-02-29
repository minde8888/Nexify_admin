import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Attribute {
    id: string;
    name: string;
}

interface AttributesState {
    data: Attribute[];
    lastRequestStatus: boolean | null;
}

const initialState: AttributesState = {
    data: [],
    lastRequestStatus: null
};

const attributesSlice = createSlice({
    name: 'attributes',
    initialState,
    reducers: {
        getAttributes: (state, action: PayloadAction<Attribute[]>) => {
            state.data = action.payload;
        },

        updateAttribute: (state, action: PayloadAction<Attribute>) => {
            const index = state.data.findIndex(attr => attr.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;
            }
            state.lastRequestStatus = true; 
        },

        removeAttributeCategory: (state, action: PayloadAction<string>) => {
            state.data = state.data.filter(attr => attr.id !== action.payload);
        },

        requestAttributesStatus: (state, action: PayloadAction<boolean>) => {
            state.lastRequestStatus = action.payload;
        }
    }
});

export const { getAttributes, updateAttribute, removeAttributeCategory, requestAttributesStatus } = attributesSlice.actions;

export default attributesSlice.reducer;

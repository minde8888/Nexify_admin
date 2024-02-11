import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../types/product';

interface PagedResponse {
    pageNumber: number;
    pageSize: number;
    product: Product[];
    length: number;
    totalPages: number;
    totalRecords: number;
}

interface ProductState {
    data: PagedResponse;
    lastRequestStatus: boolean | null;
}

const initialState: ProductState = {
    data: {
        pageNumber: 0,
        pageSize: 0,
        product: [],
        length: 0,
        totalPages: 0,
        totalRecords: 0
    },
    lastRequestStatus: null
};

const productsSlice = createSlice({
    name: 'products',
    initialState,

    reducers: {
        getProducts: (state, action: PayloadAction<PagedResponse>) => {
            state.data = action.payload;
            state.lastRequestStatus = null;
            return state;
        },

        removeProducts: (state, action: PayloadAction<string>) => {
            state.data.product = state.data.product.filter((item) => item.id !== action.payload);
            return state;
        },

        requestProductsStatus: (state, action: PayloadAction<boolean>) => {
            state.lastRequestStatus = action.payload;
            return state;
        }
    }
});

export const { getProducts, removeProducts, requestProductsStatus } = productsSlice.actions;

export default productsSlice.reducer;

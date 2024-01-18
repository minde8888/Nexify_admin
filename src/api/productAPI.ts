import axios, { AxiosError } from 'axios';
import api from './instanceAPI';

import { PRODUCTS_URL } from '../constants/apiConst';
import { ProductError } from '../errorHandler/productError';

export const submitProduct = async (formData: FormData): Promise<void> => {
    try {
        await api.post(PRODUCTS_URL, formData);
    } catch (error) {
        // if (axios.isAxiosError(error)) {
        //     const serverError = error as AxiosError<ServerError>;
        //     if (serverError.response?.data) {
        //         throw new ProductError(serverError.response.data.errors.$values[0]);
        //     }
        // }
        throw new ProductError('An error occurred while adding the product.');
    }
};

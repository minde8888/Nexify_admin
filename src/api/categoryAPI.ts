import axios, { AxiosError } from 'axios';
import api from './instanceAPI';
import { ServerError } from '../types/serverError';
import { CATEGORIES_URL } from '../constants/apiConst';

export const submitCategory = async (formData: any): Promise<void> => {
    try {
        await api.post(CATEGORIES_URL, formData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError.response?.data) {
                throw new CategoryError(serverError.response.data.errors.$values[0]);
            }
        }
        throw new CategoryError('An error occurred while adding the category.');
    }
};

import axios, { AxiosError } from 'axios';
import api from './instanceAPI';
import { ServerError } from '../types/serverError';
import { CATEGORIES_URL } from '../constants/apiConst';
import { CategoryResponse } from '../types/category';
import { CategoryError } from '../errorHandler/categoryError';

export const submitCategory = async (formData: FormData, slug: string = ''): Promise<void> => {
    const url = CATEGORIES_URL + slug;

    try {
        await api.post(url, formData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError.response?.data) {
                const errorMessage = serverError.response.data.errors.$values[0];
                throw new CategoryError(`An error occurred while processing the category operation: ${errorMessage}`);
            }
        }

        throw new CategoryError('An error occurred while processing the category operation.');
    }
};

export const fetchAllCategories = async (): Promise<CategoryResponse[]> => {
    const url = CATEGORIES_URL;

    try {
        const response : ApiResponse<CategoryResponse[]> = await api.get(url);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError.response?.data) {
                const errorMessage = serverError.response.data.errors.$values[0];
                throw new CategoryError(`An error occurred while fetching categories: ${errorMessage}`);
            }
        }

        throw new CategoryError('An error occurred while fetching categories.');
    }
};

export const updateCategory = async (formData: FormData, slug: string = ''): Promise<void> => {
    const url = CATEGORIES_URL + slug;

    try {
        await api.put(url, formData);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError.response?.data) {
                const errorMessage = serverError.response.data.errors.$values[0];
                throw new CategoryError(`An error occurred while updating the category: ${errorMessage}`);
            }
        }

        throw new CategoryError('An error occurred while updating the category.');
    }
};

export const deleteCategory = async (slug: string): Promise<void> => {  
    const url = CATEGORIES_URL + slug;

    try {
        await api.delete(url);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError.response?.data) {
                const errorMessage = serverError.response.data.errors.$values[0];
                throw new CategoryError(`An error occurred while deleting the category: ${errorMessage}`);
            }
        }

        throw new CategoryError('An error occurred while deleting the category.');
    }   
}
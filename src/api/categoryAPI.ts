import { CategoryError } from './../errorHandler/categoryError';
import axios, { AxiosError, AxiosResponse } from 'axios';
import api from './instanceAPI';
import { ServerError } from '../types/serverError';
import { CATEGORIES_URL } from '../constants/apiConst';
import { CategoryResponse } from '../types/category';

type HttpMethod = 'post' | 'get' | 'put' | 'delete';

const handleRequest = async <T>(method: HttpMethod, url: string, formData?: FormData): Promise<T> => {
    try {
        let response: AxiosResponse<T>;
        switch (method) {
            case 'post':
                response = await api.post(url, formData);
                break;
            case 'get':
                response = await api.get(url);
                break;
            case 'put':
                response = await api.put(url, formData);
                break;
            case 'delete':
                response = await api.delete(url);
                break;
            default:
                throw new Error('Invalid HTTP method');
        }

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError.response?.data) {
                const errorMessage = serverError.response.data.errors.$values[0];
                throw new CategoryError(`An error occurred: ${errorMessage}`);
            }
        }

        throw new CategoryError('An error occurred.');
    }
};

export const submitCategory = async (formData: FormData, slug: string = ''): Promise<void> => {
    const url = CATEGORIES_URL + slug;
    await handleRequest<void>('post', url, formData);
};

export const fetchAllCategories = async (): Promise<CategoryResponse[]> => {
    const url = CATEGORIES_URL;
    return handleRequest<CategoryResponse[]>('get', url);
};

export const updateCategory = async (formData: FormData, slug: string = ''): Promise<void> => {
    const url = CATEGORIES_URL + slug;
    await handleRequest<void>('put', url, formData);
};

export const deleteCategory = async (slug: string): Promise<void> => {
    const url = CATEGORIES_URL + slug;
    await handleRequest<void>('delete', url);
};

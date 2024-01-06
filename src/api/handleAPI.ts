import axios, { AxiosError, AxiosResponse } from 'axios';
import api from './instanceAPI';
import { ServerError } from '../types/serverError';
import { ApiError } from '../errorHandler/apiError';
import { HttpMethodError } from '../errorHandler/httpMethodError';
import { DELETE_METHOD, GET_METHOD, POST_METHOD, PUT_METHOD } from '../constants/apiConst';

const handleRequest = async <T>({ method, url, id, formData }: ApiRequest): Promise<T | undefined> => {
    try {
        const response: AxiosResponse<T> = await makeApiRequest<T>({ method, url, id, formData });

        return response.data;
    } catch (error) {
        handleRequestError(error as ApiRequest);
        return undefined;
    }
};

const makeApiRequest = async <T>({ method, url, id, formData }: ApiRequest): Promise<AxiosResponse<T>> => {
    const apiUrl = id ? `${url}/id?id=${id}` : url;

    switch (method) {
        case POST_METHOD:
            return await api.post(apiUrl, formData);
        case GET_METHOD:
            return await api.get(apiUrl);
        case PUT_METHOD:
            return await api.put(apiUrl, formData);
        case DELETE_METHOD:
            return await api.delete(apiUrl);
        default:
            throw new HttpMethodError('Invalid HTTP method');
    }
};

const handleRequestError = (error: any): never => {
    if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;
        if (serverError.response?.data) {
            const errorMessage = serverError.response.data.errors.$values[0];
            throw new ApiError(`An error occurred: ${errorMessage}`);
        }
    }
    throw new ApiError('An error occurred.');
};

export const handlePostRequest = async <T>(url: string, formData?: FormData): Promise<T | undefined> => handleRequest<T>({ method: 'post', url, formData });

export const handlePutRequest = async <T>(url: string, formData?: FormData): Promise<T | undefined> => handleRequest<T>({ method: 'put', url, formData });

export const handleGetRequest = async <T>(url: string): Promise<T | undefined> => handleRequest<T>({ method: 'get', url });

export const handleGetAllRequest = async <T>(url: string): Promise<T | undefined> => handleRequest<T>({ method: 'get', url });

export const handleDeleteRequest = async <T>(url: string, id: string): Promise<T | undefined> => handleRequest<T>({ method: 'delete', url, id });

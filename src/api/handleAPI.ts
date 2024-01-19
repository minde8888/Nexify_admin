import { AxiosError, AxiosResponse } from 'axios';
import api from './instanceAPI';
import { DELETE_METHOD, GET_METHOD, POST_METHOD, PUT_METHOD } from '../constants/apiConst';

const handleRequest = async (request: ApiRequest, isDataExpected: boolean): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await makeApiRequest(request);
        return isDataExpected ? response.data : response.status;
    } catch (error) {
        const axiosError = error as AxiosError;
        return axiosError.response?.status || 500;
    }
};

const makeApiRequest = async (request: ApiRequest): Promise<AxiosResponse<any>> => {
    const apiUrl = request.id ? `${request.url}/id?id=${request.id}` : request.url;
    switch (request.method) {
        case POST_METHOD:
            return await api.post(apiUrl, request.formData);
        case GET_METHOD:
            return await api.get(apiUrl);
        case PUT_METHOD:
            return await api.put(apiUrl, request.formData);
        case DELETE_METHOD:
            return await api.delete(apiUrl);
        default:
            throw new Error('Invalid HTTP method');
    }
};

export const handlePostRequest = async (url: string, formData?: FormData): Promise<number> => {
    return handleRequest({ method: POST_METHOD, url, formData }, false);
};

export const handlePutRequest = async (url: string, formData?: FormData): Promise<number> => {
    return handleRequest({ method: PUT_METHOD, url, formData }, false);
};

export const handleGetRequest = async <T>(url: string): Promise<T> => {
    return handleRequest({ method: GET_METHOD, url }, true);
};

export const handleDeleteRequest = async <T>(url: string, id: string): Promise<T> => {
    return handleRequest({ method: DELETE_METHOD, url, id }, true);
};

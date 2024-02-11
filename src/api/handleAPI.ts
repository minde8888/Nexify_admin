import { AxiosError, AxiosResponse } from 'axios';
import api from './instanceAPI';
import { DELETE_METHOD, GET_METHOD, POST_METHOD, PUT_METHOD } from '../constants/apiConst';

interface ApiRequest {
    method: string;
    url: string;
    formData?: FormData;
    id?: string;
}

const requestMethods: { [key: string]: (api: any, apiUrl: string, formData?: FormData) => Promise<AxiosResponse<any>> } = {
    [POST_METHOD]: async (api, apiUrl, formData) => api.post(apiUrl, formData),
    [GET_METHOD]: async (api, apiUrl) => api.get(apiUrl),
    [PUT_METHOD]: async (api, apiUrl, formData) => api.put(apiUrl, formData),
    [DELETE_METHOD]: async (api, apiUrl) => api.delete(apiUrl)
};

const handleRequest = async (request: ApiRequest, isDataExpected: boolean): Promise<any> => {
    try {
        const apiUrl = request.id ? `${request.url}/id?id=${request.id}` : request.url;
        const requestMethod = requestMethods[request.method];
        if (requestMethod) {
            const response: AxiosResponse<any> = await requestMethod(api, apiUrl, request.formData);
            return isDataExpected ? response.data : response.status;
        } else {
            throw new Error('Invalid HTTP method');
        }
    } catch (error) {
        const axiosError = error as AxiosError;
        return axiosError.response?.status || 500;
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

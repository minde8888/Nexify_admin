import { DELETE_METHOD, GET_METHOD, POST_METHOD, PUT_METHOD } from '../../constants/apiConst';
import { GET_ALL_REQUEST, POST_REQUEST, PUT_REQUEST, DELETE_REQUEST } from './../../constants/actionConst';

const createApiAction = (type: string, method: string, url: string, data?: any) => ({
    type,
    meta: {
        api: { method, url, ...data }
    }
});

export const postAction = (formData: FormData, url: string) => createApiAction(POST_REQUEST, POST_METHOD, url, { formData });

export const putAction = (formData: FormData, values: any, url: string) => {
    const { image, ...filteredValues } = values;
    return createApiAction(PUT_REQUEST, PUT_METHOD, url,  {
        formData,
        payload: filteredValues
    });
};

export const getAllAction = (url: string) => createApiAction(GET_ALL_REQUEST, GET_METHOD, url);

export const deleteAction = (url: string, id: string, bool?: boolean) => createApiAction(DELETE_REQUEST, DELETE_METHOD, url,  { id });

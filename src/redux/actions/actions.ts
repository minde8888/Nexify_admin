import { DELETE_METHOD, GET_METHOD, POST_METHOD, PUT_METHOD } from '../../constants/apiConst';
import { GET_ALL_REQUEST, POST_REQUEST, PUT_REQUEST, DELETE_REQUEST } from './../../constants/actionConst';

const createApiAction = (method: string, url: string, data?: any) => ({
    meta: {
        api: { method, url, ...data },
    },
});

export const postAction = (formData: FormData, url: string) => ({
    type: POST_REQUEST,
    ...createApiAction(POST_METHOD, url, { formData }),
});

export const putAction = (formData: FormData, values: any, url: string) => {
    const { image, ...filteredValues } = values;
    return {
        type: PUT_REQUEST,
        payload: filteredValues,
        ...createApiAction(PUT_METHOD, url, { formData }),
    };
};

export const getAllAction = (url: string) => ({
    type: GET_ALL_REQUEST,
    ...createApiAction(GET_METHOD, url),
});

export const deleteAction = (url: string, id: string, bool?: boolean) => ({
    type: DELETE_REQUEST,
    ...createApiAction(DELETE_METHOD, url, { id, bool }),
});

import { GET_ALL_REQUEST, POST_REQUEST, PUT_REQUEST, DELETE_REQUEST } from './../../constants/actionConst';

const createApiAction = (method: string, url: string, data?: any) => ({
    meta: {
        api: { method, url, ...data },
    },
});

export const postAction = (formData: FormData, url: string) => ({
    type: POST_REQUEST,
    ...createApiAction('post', url, { formData }),
});

export const putAction = (formData: FormData, values: any, url: string) => {
    const { image, ...filteredValues } = values;
    return {
        type: PUT_REQUEST,
        payload: filteredValues,
        ...createApiAction('put', url, { formData }),
    };
};

export const getAllAction = (url: string) => ({
    type: GET_ALL_REQUEST,
    ...createApiAction('get', url),
});

export const deleteAction = (url: string, id: string, bool: boolean) => ({
    type: DELETE_REQUEST,
    ...createApiAction('delete', url, { id, bool }),
});

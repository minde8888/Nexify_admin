import { GET_ALL_REQUEST, POST_REQUEST, PUT_REQUEST } from './../../constants/actionConst';

export const postAction = (formData: FormData, url: string) => ({
    type: POST_REQUEST,
    meta: {
        api: {
            method: 'post',
            url: url,
            formData
        }
    }
});

export const putAction = (formData: FormData, values: any, url: string) => {
    const { image, ...filteredValues } = values;

    return {
        type: PUT_REQUEST,
        payload: filteredValues,
        meta: {
            api: {
                method: 'put',
                url: url,
                formData
            }
        }
    };
};

export const getAllAction = (url: string) => ({
    type: GET_ALL_REQUEST,
    meta: {
        api: {
            method: 'get',
            url: url
        }
    }
});

export const deleteAction = (url: string, id: string, bool: boolean) => ({
    type: 'DELETE_REQUEST',
    meta: {
        api: {
            method: 'delete',
            url: url,
            id: id,
            bool: bool
        }
    }
});

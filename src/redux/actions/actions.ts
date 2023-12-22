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

export const putAction = (formData: FormData, values: any, url: string, bool?: boolean) => {
    const { image, ...filteredValues } = values;

    return {
        type: PUT_REQUEST,
        payload: filteredValues,
        meta: {
            api: {
                method: 'put',
                url: url,
                formData,
                bool: bool
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
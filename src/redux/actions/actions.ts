import { POST_REQUEST, PUT_REQUEST } from './../../constants/actionConst';

export const postAction = (formData: FormData, url: string,) => ({
  type: POST_REQUEST,
  meta: {
    api: {
      method: 'post',
      url: url, 
      formData,
    },
  },
});

export const putAction = (formData: FormData, url: string, bool?: boolean) => ({
    type: PUT_REQUEST,
    payload: { bool }, 
    meta: {
        api: {
            method: 'put',
            url: url, 
            formData,
        },
    },
});
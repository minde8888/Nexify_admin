import { handleGetRequest } from '../api/handleAPI';
import { MethodError } from '../errorHandler/methodError';
import { RootState } from '../redux/store';
import { Middleware } from '@reduxjs/toolkit';
import { update } from './update';
import { getAll } from './getAll';
import { remove } from './remove';
import { DELETE_METHOD, GET_METHOD, POST_METHOD, PUT_METHOD } from '../constants/apiConst';
import { post } from './post';

const isApiAction = (action: any): action is ApiAction => {
    return typeof action === 'object' && action !== null && 'meta' in action && action.meta && 'api' in action.meta;
};

const apiMiddleware: Middleware<{}, RootState> =
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        if (isApiAction(action)) {
            const { api } = action.meta!;
            const { method, url, formData, bool, id, payload } = api!;

            switch (method) {
                case POST_METHOD:
                    // if (formData) {
                    //     console.log(Object.fromEntries(formData), 'post');
                    // }
                    post({ dispatch, url, formData: formData ?? new FormData() });
                    break;
                case PUT_METHOD:
                    // if (formData) {
                    //     console.log(Object.fromEntries(formData), 'update');
                    // }
                    update({ dispatch, payload: payload, url, formData: formData ?? new FormData() });
                    break;
                case GET_METHOD:
                    const values = await handleGetRequest(url);
                    getAll({ dispatch, payload: values, url });
                    break;
                case DELETE_METHOD:
                    await remove({ dispatch, bool, url, id: id ?? '' });
                    break;
                default:
                    throw new MethodError(`Unsupported method: ${method}`);
            }
        }

        return next(action);
    };

export default apiMiddleware;

import { handleGetAllRequest, handlePostRequest } from '../api/handleAPI';
import { MethodError } from '../errorHandler/methodError';
import { RootState } from '../redux/store';
import { Middleware } from '@reduxjs/toolkit';
import { update } from './update';
import { getAll } from './getAll';
import { remove } from './remove';

const apiMiddleware: Middleware<{}, RootState> =
    ({ dispatch }) =>
    (next) =>
    async (action: ApiAction) => {
        if (action.meta?.api) {
            const { method, url, formData, bool, id } = action.meta.api;

            switch (method) {
                case 'post':
                    await handlePostRequest(url, formData);
                    break;
                case 'put':
                    // if (formData) {
                    //     console.log(Object.fromEntries(formData));
                    // }
                    update({ dispatch, payload: action.payload, url, formData: formData ?? new FormData() });
                    break;
                case 'get':
                    const values = await handleGetAllRequest(url);
                    getAll({ dispatch, payload: values, url });
                    break;
                case 'delete':
                    remove({ dispatch, bool, url, id: id ?? '' });
                    break;
                default:
                    throw new MethodError(`Unsupported method: ${method}`);
            }
        }

        return next(action);
    };

export default apiMiddleware;

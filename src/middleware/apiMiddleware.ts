import { handleGetRequest, handlePostRequest } from '../api/handleAPI';
import { MethodError } from '../errorHandler/methodError';
import { RootState } from '../redux/store';
import { Middleware } from '@reduxjs/toolkit';
import { update } from './update';
import { getAll } from './getAll';
import { remove } from './remove';
import { DELETE_METHOD, GET_METHOD, POST_METHOD, PUT_METHOD } from '../constants/apiConst';
import { requestStatus } from '../redux/slice/categoriesSlice';

const apiMiddleware: Middleware<{}, RootState> =
    ({ dispatch }) =>
    (next) =>
    async (action: ApiAction) => {
        if (action.meta?.api) {
            const { method, url, formData, bool, id, payload } = action.meta.api;

            switch (method) {
                case POST_METHOD:
                    // if (formData) {
                    //     console.log(Object.fromEntries(formData));
                    // }
                    const responsePost = await handlePostRequest(url, formData);
                    dispatch(requestStatus(responsePost === 200));
                    break;
                case PUT_METHOD:
                    if (formData) {
                        console.log(Object.fromEntries(formData));
                    }

                    const responseUpdate = await update({ dispatch, payload: payload, url, formData: formData ?? new FormData() });
                    dispatch(requestStatus(responseUpdate === 200));
                    break;
                case GET_METHOD:
                    const values = await handleGetRequest(url);
                    getAll({ dispatch, payload: values, url });
                    break;
                case DELETE_METHOD:
                    const responseDelete = await remove({ dispatch, bool, url, id: id ?? '' });
                    dispatch(requestStatus(responseDelete === 200));
                    break;
                default:
                    throw new MethodError(`Unsupported method: ${method}`);
            }
        }

        return next(action);
    };

export default apiMiddleware;

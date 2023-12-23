import { handleDeleteRequest, handleGetAllRequest, handlePostRequest, handlePutRequest } from '../api/handleAPI';
import { MethodError } from '../errorHandler/methodError';
import { RootState } from '../redux/store';
import { Middleware } from '@reduxjs/toolkit';
import { handleUpdateRequests } from './handleUpdateRequests';
import { getAll } from './handleGetAllRequest';

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
                    
                    handleUpdateRequests({ dispatch, payload: action.payload, bool, url });
                    handlePutRequest(url, formData);                 
                    break;
                case 'get':
                    const values = await handleGetAllRequest(url);
                    getAll({ dispatch, payload: values, url });
                    break;
                case 'delete':
                    handleDeleteRequest(url, id ?? '');
                    break;
                default:
                    throw new MethodError(`Unsupported method: ${method}`);
            }
        }

        return next(action);
    };

export default apiMiddleware;

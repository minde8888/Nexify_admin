import { handlePostRequest, handlePutRequest } from '../api/apiHandle';
import { MethodError } from '../errorHandler/methodError';
import { updateCategory, updateSubcategory } from '../redux/slice/categoriesSlice';
import { RootState } from '../redux/store';
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';

const apiMiddleware: Middleware<{}, RootState> =
    ({ dispatch }) =>
    (next) =>
    async (action: ApiAction) => {
        if (action.meta?.api) {
            const { method, url, formData, bool } = action.meta.api;

            switch (method) {
                case 'post':
                    await handlePostRequest(url, formData);
                    break;
                case 'put':
                    handleUpdateRequests(dispatch, action.payload, bool);
               

                    // if (formData) {
                    //     console.log(Object.fromEntries(formData));
                    // }
                   
                    // await handlePutRequest(url, formData);
                    break;
                // Add cases for other HTTP methods if needed
                default:
                    throw new MethodError(`Unsupported method: ${method}`);
            }
        }

        return next(action);
    };

const handleUpdateRequests = (dispatch: Dispatch<AnyAction>, payload: any, bool?: boolean) => {

     if (!bool) {
        dispatch(updateCategory(payload));
    }else{
        dispatch(updateSubcategory(payload));
    }
};

export default apiMiddleware;

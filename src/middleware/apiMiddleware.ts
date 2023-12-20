import { AnyAction, Dispatch, Middleware } from 'redux';
import { handlePostRequest, handlePutRequest } from '../api/apiHandle';
import { updateCategory, updateSubcategory } from '../redux/slice/categoriesSlice';
import { RootState } from '../redux/store';

const apiMiddleware: Middleware<{}, RootState> =
    ({ dispatch }) =>
    (next) =>
    async (action: ApiAction) => {
        if (action.meta?.api) {
            const { method, url, formData, bool } = action.meta.api;
            try {
                switch (method) {
                    case 'post':
                        await handlePostRequest(url, formData);
                        break;
                    case 'put':
                        handleUpdateRequests(dispatch, action.payload, bool);
                        await handlePutRequest(url, formData);
                        break;
                    // Add cases for other HTTP methods if needed
                    default:
                        throw new Error(`Unsupported method: ${method}`);
                }
            } catch (error) {
                handleApiError(error);
            }
        }

        return next(action);
    };

const handleUpdateRequests = (dispatch: Dispatch<AnyAction>, payload: any, bool?: boolean) => {
    if (bool) {
        dispatch(updateCategory(payload));
    }
    dispatch(updateSubcategory(payload));
};

const handleApiError = (error: any) => {
    // Handle errors as needed
    console.error('API request error:', error);
};

export default apiMiddleware;

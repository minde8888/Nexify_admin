import { handleGetRequest } from '../api/handleAPI';
import { MethodError } from '../errorHandler/methodError';
import { RootState } from '../redux/store';
import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import { update } from './update';
import { getAll } from './getAll';
import { remove } from './remove';
import { DELETE_METHOD, GET_METHOD, POST_METHOD, PUT_METHOD } from '../constants/apiConst';
import { post } from './post';

const isApiAction = (action: any): action is ApiAction => {
    return typeof action === 'object' && action !== null && 'meta' in action && action.meta && 'api' in action.meta;
};

interface ApiOperationHandler {
    (args: { dispatch: Dispatch<AnyAction>; url: string; formData?: FormData; bool?: boolean; id?: string; payload?: any }): Promise<void>;
}

const postOperation: ApiOperationHandler = async ({ dispatch, url, formData = new FormData() }) => {
    await post({ dispatch, url, formData });
};

const putOperation: ApiOperationHandler = async ({ dispatch, url, formData = new FormData(), payload }) => {
    await update({ dispatch, payload, url, formData });
};

const getOperation: ApiOperationHandler = async ({ dispatch, url }) => {
    const values = await handleGetRequest(url);
    getAll({ dispatch, payload: values, url });
};

const deleteOperation: ApiOperationHandler = async ({ dispatch, url, bool, id = '' }) => {
    await remove({ dispatch, bool, url, id });
};

const methodOperationsMap: { [method: string]: ApiOperationHandler } = {
    [POST_METHOD]: postOperation,
    [PUT_METHOD]: putOperation,
    [GET_METHOD]: getOperation,
    [DELETE_METHOD]: deleteOperation
};

const apiMiddleware: Middleware<{}, RootState> =
    ({ dispatch }) =>
    (next) =>
    async (action) => {
        if (isApiAction(action)) {
            const { api } = action.meta!;
            const { method, url, formData, bool, id, payload } = api!;

            const operationHandler = methodOperationsMap[method];

            if (!operationHandler) {
                throw new MethodError(`Unsupported method: ${method}`);
            }

            await operationHandler({ dispatch, url, formData, bool, id, payload });
        }

        return next(action);
    };

export default apiMiddleware;

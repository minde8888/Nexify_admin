import { useCallback } from 'react';
import { processCategory } from '../utils/helpers/processCategory';
import CategoryFormProperty from '../types/categoryFormProperty';
import { MethodError } from '../errorHandler/methodError';
import { createFormData } from '../utils/helpers/createFormData';
import { handlePostRequest, handlePutRequest } from '../api/apiHandle';
import { UseFormError } from '../errorHandler/useFormError';
import { updateCategory, updateSubcategory } from '../redux/slice/categoriesSlice';
import { useAppDispatch } from '../redux/store';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

type MethodHandler<T> = (formData: FormData, values: T, dispatch: Dispatch<AnyAction>) => void;

const methodHandlers: Record<string, MethodHandler<any>> = {
    post: (formData, { properties }) => {
        const categoryList = properties || [];
        categoryList.forEach((category: CategoryFormProperty, categoryIndex: number) => {
            processCategory(formData, category, categoryIndex);
        });
    },
    update: (formData, values, dispatch) => {
        // console.log('====================================');
        // console.log('values', values);
        // console.log('====================================');
        // createFormData(values, formData);
        if (values.accept) {
            dispatch(updateCategory(values));
        }
       dispatch(updateSubcategory(values));
       
    }
};

function useForm<T>(method: string, url: string, post?: boolean) {
    const dispatch = useAppDispatch();

    const handleSubmit = useCallback(
        async (values: T) => {
            const formData = new FormData();

            const handler = methodHandlers[method];
            if (handler) {
                handler(formData, values, dispatch);
            } else {
                throw new MethodError(`Unsupported method: ${method}`);
            }

            try {
                const requestHandler = post ? handlePostRequest : handlePutRequest;
                await requestHandler<T>(url, formData);
            } catch (error) {
                throw new UseFormError(`Error handling form submission: ${error}`);
            }
        },
        [method, url, post, dispatch]
    );

    return {
        handleSubmit
    };
}

export default useForm;

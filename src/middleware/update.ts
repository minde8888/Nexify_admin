import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { updateCategory, updateSubcategory } from '../redux/slice/categoriesSlice';
import { BLOG_CATEGORIES_URL, CATEGORY_UPDATE_URL, SUBCATEGORY_UPDATE_URL } from '../constants/apiConst';
import { handlePutRequest } from '../api/handleAPI';
import { updatePostCategory } from '../redux/slice/blogCategoriesSlice';

interface UpdateProps {
    dispatch: Dispatch<AnyAction>;
    payload: any;
    url: string;
    formData: FormData;
}

export const update = async ({ dispatch, payload, url, formData }: UpdateProps) => {
    switch (url) {
        case CATEGORY_UPDATE_URL:
            if (payload.accept) {
                dispatch(updateCategory(payload));
                return await handlePutRequest(url, formData);
            } else {
                dispatch(updateSubcategory(payload));
                return await handlePutRequest(SUBCATEGORY_UPDATE_URL, formData);
            }
        case BLOG_CATEGORIES_URL: {
            dispatch(updatePostCategory(payload));
            return await handlePutRequest(url, formData);
        }
    }
};

import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { requestCategoryStatus, updateCategory, updateSubcategory } from '../redux/slice/categoriesSlice';
import { BLOG_CATEGORY_UPDATE_URL, CATEGORY_UPDATE_URL, SUBCATEGORY_UPDATE_URL } from '../constants/apiConst';
import { handlePutRequest } from '../api/handleAPI';
import { requestBlogCategoryStatus, updatePostCategory } from '../redux/slice/blogCategoriesSlice';

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

                const responseCategoryUpdate = await handlePutRequest(url, formData);
                dispatch(requestCategoryStatus(responseCategoryUpdate === 200));
            } else {
                dispatch(updateSubcategory(payload));

                const responseSubcategoryUpdate = await handlePutRequest(SUBCATEGORY_UPDATE_URL, formData);
                dispatch(requestCategoryStatus(responseSubcategoryUpdate === 200));
            }
            break;
        case BLOG_CATEGORY_UPDATE_URL: {
            dispatch(updatePostCategory(payload));

            const responsePostCategoryUpdate = await handlePutRequest(url, formData);
            dispatch(requestBlogCategoryStatus(responsePostCategoryUpdate === 200));
            break;
        }
    }
};

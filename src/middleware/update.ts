import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { requestCategoryStatus } from '../redux/slice/categoriesSlice/categoriesSlice';
import { BLOG_CATEGORY_UPDATE_URL, BLOG_UPDATE_URL, CATEGORY_UPDATE_URL, PRODUCT_UPDATE_URL, SUBCATEGORY_UPDATE_URL } from '../constants/apiConst';
import { handlePutRequest } from '../api/handleAPI';
import { requestBlogCategoryStatus } from '../redux/slice/blogCategories/blogCategoriesSlice';
import { UrlError } from '../errorHandler/urlError';
import { requestBlogStatus } from '../redux/slice/postsSlice/postsSlice';
import { requestProductsStatus } from '../redux/slice/productsSlice/productsSlice';

interface UpdateProps {
    dispatch: Dispatch<AnyAction>;
    payload: any;
    url: string;
    formData: FormData;
}

const updateCategory = async (dispatch: Dispatch<AnyAction>, url: string, formData: FormData) => {
    dispatch(requestCategoryStatus(false));
    const response = await handlePutRequest(url, formData);
    dispatch(requestCategoryStatus(response === 200));
};

const updateBlogCategory = async (dispatch: Dispatch<AnyAction>, url: string, formData: FormData) => {
    dispatch(requestBlogCategoryStatus(false));
    const response = await handlePutRequest(url, formData);
    dispatch(requestBlogCategoryStatus(response === 200));
};

const updateBlog = async (dispatch: Dispatch<AnyAction>, url: string, formData: FormData) => {
    dispatch(requestBlogStatus(false));
    const response = await handlePutRequest(url, formData);
    dispatch(requestBlogStatus(response === 200));
};

const updateProduct = async (dispatch: Dispatch<AnyAction>, url: string, formData: FormData) => {
    if (formData) {
        console.log(Object.fromEntries(formData), 'post', url );
    }
    // dispatch(requestProductsStatus(false));
    // const response = await handlePutRequest(url, formData);
    // dispatch(requestProductsStatus(response === 200));
};

export const update = async ({ dispatch, url, formData }: UpdateProps) => {
    const actionMap: { [key: string]: (dispatch: Dispatch<AnyAction>, url: string, formData: FormData) => Promise<void> } = {
        [CATEGORY_UPDATE_URL]: updateCategory,
        [SUBCATEGORY_UPDATE_URL]: updateCategory,
        [BLOG_CATEGORY_UPDATE_URL]: updateBlogCategory,
        [BLOG_UPDATE_URL]: updateBlog,
        [PRODUCT_UPDATE_URL]: updateProduct,
    };

    const actionFunction = actionMap[url];

    if (actionFunction) {
        await actionFunction(dispatch, url, formData);
    } else {
        throw new UrlError('Unsupported url');
    }
};

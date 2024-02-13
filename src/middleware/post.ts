import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { UrlError } from '../errorHandler/urlError';
import { BLOG_CATEGORIES_URL, BLOG_URL, CATEGORIES_URL, PRODUCT_URL, SUBCATEGORIES_URL } from '../constants/apiConst';
import { requestCategoryStatus } from '../redux/slice/categoriesSlice/categoriesSlice';
import { handlePostRequest } from '../api/handleAPI';
import { requestBlogCategoryStatus } from '../redux/slice/blogCategories/blogCategoriesSlice';
import { requestBlogStatus } from '../redux/slice/postsSlice/postsSlice';
import { requestProductsStatus } from '../redux/slice/productsSlice/productsSlice';

interface PostProps {
    dispatch: Dispatch<AnyAction>;
    url: string;
    formData: FormData;
}

interface PostOperation {
    (dispatch: Dispatch<AnyAction>, url: string, formData: FormData): Promise<void>;
}

const categoryPostOperation: PostOperation = async (dispatch, url, formData) => {
    const response = await handlePostRequest(url, formData);
    dispatch(requestCategoryStatus(response === 200));
};

const subCategoryPostOperation: PostOperation = async (dispatch, url, formData) => {
    const response = await handlePostRequest(url, formData);
    dispatch(requestCategoryStatus(response === 200));
};

const blogCategoryPostOperation: PostOperation = async (dispatch, url, formData) => {
    const response = await handlePostRequest(url, formData);
    dispatch(requestBlogCategoryStatus(response === 200));
};

const blogPostOperation: PostOperation = async (dispatch, url, formData) => {
    const response = await handlePostRequest(url, formData);
    dispatch(requestBlogStatus(response === 200));
};

const productPostOperation: PostOperation = async (dispatch, url, formData) => {
                if (formData) {
                        console.log(Object.fromEntries(formData), 'post');
                    }
    // const response = await handlePostRequest(url, formData);
    // dispatch(requestProductsStatus(response === 200));
};

export const post = async ({ dispatch, formData, url }: PostProps) => {
    const postOperationsMap: { [url: string]: PostOperation } = {
        [CATEGORIES_URL]: categoryPostOperation,
        [SUBCATEGORIES_URL]: subCategoryPostOperation,
        [BLOG_CATEGORIES_URL]: blogCategoryPostOperation,
        [BLOG_URL]: blogPostOperation,
        [PRODUCT_URL]: productPostOperation
    };

    const actionFunction = postOperationsMap[url];

    if (actionFunction) {
        await actionFunction(dispatch, url, formData);
    } else {
        throw new UrlError('Unsupported url');
    }
};

import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { getCategories } from '../redux/slice/categoriesSlice/categoriesSlice';
import { CATEGORIES_URL, BLOG_CATEGORIES_URL, BLOG_URL } from '../constants/apiConst';
import { getPostCategories } from '../redux/slice/blogCategories/blogCategoriesSlice';
import { UrlError } from '../errorHandler/urlError';
import { getPosts } from '../redux/slice/postsSlice/postsSlice';
import { removeQueryParamsFromUrl } from '../utils/helpers/removeQueryParamsFromUrl';

interface GetAllProps {
    dispatch: Dispatch<AnyAction>;
    payload: any;
    url: string;
}

export const getAll = ({ dispatch, payload, url }: GetAllProps) => {

    const urlHandlers: { [key: string]: (payload: any) => void } = {
        [CATEGORIES_URL]: (payload) => dispatch(getCategories(payload)),
        [BLOG_CATEGORIES_URL]: (payload) => dispatch(getPostCategories(payload)),
        [BLOG_URL]: (payload) => dispatch(getPosts(payload)),
    };

    const updatedUrl = removeQueryParamsFromUrl(url);
    const handler = urlHandlers[updatedUrl];
    if (handler) {
        handler(payload);
    } else {
        throw new UrlError('Unsupported url');
    }
};


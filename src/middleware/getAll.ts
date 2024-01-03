import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { getCategories } from '../redux/slice/categoriesSlice';
import { CATEGORIES_URL, BLOG_CATEGORIES_URL, BLOG_URL } from '../constants/apiConst';
import { getPostCategories } from '../redux/slice/blogCategoriesSlice';
import { UrlError } from '../errorHandler/urlError';
import { getPosts } from '../redux/slice/postsSlice';

interface GetAllProps {
    dispatch: Dispatch<AnyAction>;
    payload: any;
    url: string;
}
export const getAll = ({ dispatch, payload, url }: GetAllProps) => {
    switch (url) {
        case CATEGORIES_URL:
            dispatch(getCategories(payload));
            break;
        case BLOG_CATEGORIES_URL:
            dispatch(getPostCategories(payload));
            break;
        case BLOG_URL:
            dispatch(getPosts(payload));
            break;
        default:
            throw new UrlError('Unsupported url');
    }
};

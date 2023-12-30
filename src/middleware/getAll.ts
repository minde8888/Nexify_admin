import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { getCategories } from '../redux/slice/categoriesSlice';
import { CATEGORIES_URL, POSTS_URL } from '../constants/apiConst';
import { getPostCategories } from '../redux/slice/blogCategoriesSlice';

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
        case POSTS_URL:
            dispatch(getPostCategories(payload));
    }
};

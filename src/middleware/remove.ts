import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { BLOG_CATEGORIES_URL, BLOG_URL, CATEGORIES_URL, PRODUCTS_URL, SUBCATEGORIES_URL } from '../constants/apiConst';
import { removeCategory, removeSubcategory } from '../redux/slice/categoriesSlice';
import { handleDeleteRequest } from '../api/handleAPI';
import { UrlError } from '../errorHandler/urlError';
import { removePost } from '../redux/slice/postsSlice';
import { removePostCategory } from '../redux/slice/blogCategoriesSlice';
import { VariableNotExistError } from '../errorHandler/variableNotExistError';

interface DeleteProps {
    dispatch: Dispatch<AnyAction>;
    bool?: boolean;
    url: string;
    id: string;
}

export const remove = async ({ dispatch, bool, url, id }: DeleteProps) => {
    if (!id) {
        throw new VariableNotExistError('ID');
    }

    switch (url) {
        case CATEGORIES_URL:
            if (bool) {
                dispatch(removeCategory(id));
                return await handleDeleteRequest(url, id);
            } else {
                dispatch(removeSubcategory(id));
                return await handleDeleteRequest(SUBCATEGORIES_URL, id);
            }
        case BLOG_URL: {
            dispatch(removePost(id));
            return await handleDeleteRequest(url, id);
        }
        case BLOG_CATEGORIES_URL: {
            dispatch(removePostCategory(id));
            return await handleDeleteRequest(url, id);
        }
        case PRODUCTS_URL: {
            break;
        }
        default:
            throw new UrlError('No such url');
    }
};

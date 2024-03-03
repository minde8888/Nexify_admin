import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { ATTRIBUTES_URL, BLOG_CATEGORIES_URL, BLOG_URL, CATEGORIES_URL, PRODUCT_URL, SUBCATEGORIES_URL } from '../constants/apiConst';
import { removeCategory, removeSubcategory } from '../redux/slice/categoriesSlice/categoriesSlice';
import { handleDeleteRequest } from '../api/handleAPI';
import { UrlError } from '../errorHandler/urlError';
import { removePost } from '../redux/slice/postsSlice/postsSlice';
import { removePostCategory } from '../redux/slice/blogCategoriesSlice/blogCategoriesSlice';
import { VariableNotExistError } from '../errorHandler/variableNotExistError';
import { removeAttributeCategory } from '../redux/slice/attributesSlice/attributesSlice';

interface DeleteProps {
    dispatch: Dispatch<AnyAction>;
    url: string;
    id: string;
}

export const remove = async ({ dispatch, url, id }: DeleteProps) => {
    if (!id) {
        throw new VariableNotExistError('ID');
    }
    console.log(url);
    const actions = [
        { url: CATEGORIES_URL, action: removeCategory },
        { url: SUBCATEGORIES_URL, action: removeSubcategory },
        { url: BLOG_URL, action: removePost },
        { url: BLOG_CATEGORIES_URL, action: removePostCategory },
        { url: PRODUCT_URL, action: removePostCategory },
        { url: ATTRIBUTES_URL, action: removeAttributeCategory }
    ].filter((action) => action.action !== undefined);

    const actionObj = actions.find((actionObj) => actionObj.url === url);

    if (actionObj && actionObj.action) {
        dispatch(actionObj.action(id));
        return await handleDeleteRequest(url, id);
    } else {
        throw new UrlError('No such url');
    }
};

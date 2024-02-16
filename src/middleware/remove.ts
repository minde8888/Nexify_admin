import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { BLOG_CATEGORIES_URL, BLOG_URL, CATEGORIES_URL, PRODUCT_URL, SUBCATEGORIES_URL } from '../constants/apiConst';
import { removeCategory, removeSubcategory } from '../redux/slice/categoriesSlice/categoriesSlice';
import { handleDeleteRequest } from '../api/handleAPI';
import { UrlError } from '../errorHandler/urlError';
import { removePost } from '../redux/slice/postsSlice/postsSlice';
import { removePostCategory } from '../redux/slice/blogCategories/blogCategoriesSlice';
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

    const actions = [
        { url: CATEGORIES_URL, action: bool ? removeCategory : undefined },
        { url: SUBCATEGORIES_URL, action: !bool ? removeSubcategory : undefined },
        { url: BLOG_URL, action: removePost },
        { url: BLOG_CATEGORIES_URL, action: removePostCategory },
        { url: PRODUCT_URL, action: removePostCategory }
    ].filter((action) => action.action !== undefined);

    const actionObj = actions.find((actionObj) => actionObj.url === url);

    if (actionObj && actionObj.action) {
        dispatch(actionObj.action(id));
        return await handleDeleteRequest(url, id);
    } else {
        throw new UrlError('No such url');
    }
};

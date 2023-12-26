import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { CATEGORIES_URL, PRODUCTS_URL, SUBCATEGORIES_URL } from '../constants/apiConst';
import { removeCategory, removeSubcategory } from '../redux/slice/categoriesSlice';
import { handleDeleteRequest } from '../api/handleAPI';

interface DeleteProps {
    dispatch: Dispatch<AnyAction>;
    bool?: boolean;
    url: string;
    id: string;
}

export const remove = ({ dispatch, bool, url, id }: DeleteProps) => {
    switch (url) {
        case CATEGORIES_URL:
            if (bool) {
                dispatch(removeCategory(id));
                handleDeleteRequest(url, id);
            } else {
                dispatch(removeSubcategory(id));
                handleDeleteRequest(SUBCATEGORIES_URL, id);
            }
            break;
        case PRODUCTS_URL: {
            break;
        }
    }
};

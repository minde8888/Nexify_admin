import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { CATEGORY_UPDATE_URL, PRODUCT_UPDATE_URL } from '../constants/apiConst';
import { removeCategory, removeSubcategory } from '../redux/slice/categoriesSlice';

interface DeleteProps {
    dispatch: Dispatch<AnyAction>;
    bool?: boolean;
    url: string;
    id: string;
}

export const remove = ({ dispatch, bool, url, id }: DeleteProps) => {
    switch (url) {
        case CATEGORY_UPDATE_URL:
            if (!bool) {
                dispatch(removeCategory(id));
            } else {
                dispatch(removeSubcategory(id));
            }
            break;
        case PRODUCT_UPDATE_URL: {
            break;
        }
    }
};

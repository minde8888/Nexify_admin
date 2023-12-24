import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { updateCategory, updateSubcategory } from '../redux/slice/categoriesSlice';
import { CATEGORY_UPDATE_URL, PRODUCT_UPDATE_URL } from '../constants/apiConst';

interface UpdateProps {
    dispatch: Dispatch<AnyAction>;
    payload: any;
    bool?: boolean;
    url: string;
}

export const update = ({ dispatch, payload, bool, url }: UpdateProps) => {
    switch (url) {
        case CATEGORY_UPDATE_URL:
            if (!bool) {
                dispatch(updateCategory(payload));
            } else {
                dispatch(updateSubcategory(payload));
            }
            break;
        case PRODUCT_UPDATE_URL: {
            break;
        }
    }
};

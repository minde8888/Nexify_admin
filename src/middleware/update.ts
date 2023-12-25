import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { updateCategory, updateSubcategory } from '../redux/slice/categoriesSlice';
import { CATEGORY_UPDATE_URL, PRODUCT_UPDATE_URL } from '../constants/apiConst';

interface UpdateProps {
    dispatch: Dispatch<AnyAction>;
    payload: any;
    url: string;
}

export const update = ({ dispatch, payload, url }: UpdateProps) => {

    switch (url) {
        case CATEGORY_UPDATE_URL:
            if (payload.accept) {
                dispatch(updateCategory(payload));
            } else {
                const modifiedPayload = {
                    ...payload,
                    subCategoryName: payload.categoryName,
                };
                delete modifiedPayload.categoryName;
                dispatch(updateSubcategory(modifiedPayload));
            }
            break;
        case PRODUCT_UPDATE_URL: {
            break;
        }
    }
};

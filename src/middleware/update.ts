import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { updateCategory, updateSubcategory } from '../redux/slice/categoriesSlice';
import { CATEGORY_UPDATE_URL, PRODUCT_UPDATE_URL, SUBCATEGORY_UPDATE_URL } from '../constants/apiConst';
import { handlePutRequest } from '../api/handleAPI';

interface UpdateProps {
    dispatch: Dispatch<AnyAction>;
    payload: any;
    url: string;
    formData: FormData;
}

export const update = ({ dispatch, payload, url, formData }: UpdateProps) => {

    switch (url) {
        case CATEGORY_UPDATE_URL:
            if (payload.accept) {
                dispatch(updateCategory(payload));
                handlePutRequest(url, formData); 
            } else {
                const modifiedPayload = {
                    ...payload,
                    subCategoryName: payload.categoryName,
                };
                delete modifiedPayload.categoryName;
                dispatch(updateSubcategory(modifiedPayload));

                handlePutRequest(SUBCATEGORY_UPDATE_URL, formData); 
            }
            break;
        case PRODUCT_UPDATE_URL: {
            break;
        }
    }
};

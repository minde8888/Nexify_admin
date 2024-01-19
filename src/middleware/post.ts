import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { UrlError } from "../errorHandler/urlError";
import { BLOG_CATEGORIES_URL, CATEGORIES_URL, SUBCATEGORIES_URL } from "../constants/apiConst";
import { requestCategoryStatus } from "../redux/slice/categoriesSlice";
import { handlePostRequest } from "../api/handleAPI";
import { requestBlogCategoryStatus } from "../redux/slice/blogCategoriesSlice";

interface PostProps {
    dispatch: Dispatch<AnyAction>;
    url: string;
    formData: FormData;
}
export const post = async ({ dispatch, formData, url }: PostProps) => {

    switch (url) {
        case CATEGORIES_URL:
            const responseCategory = await handlePostRequest(url, formData);
            dispatch(requestCategoryStatus(responseCategory === 200));
            break;
        case SUBCATEGORIES_URL:
            const responseSubCategory = await handlePostRequest(url, formData);
            dispatch(requestCategoryStatus(responseSubCategory === 200));
            break;
        case BLOG_CATEGORIES_URL:
            const responseBlogCategory = await handlePostRequest(url, formData);
            dispatch(requestBlogCategoryStatus(responseBlogCategory === 200));
            break;
        default:
            throw new UrlError('Unsupported Post url');
    }
};
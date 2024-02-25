import { combineReducers } from 'redux';
import authSlice from '../slice/authSlice/authSlice';
import categoriesSlice from '../slice/categoriesSlice/categoriesSlice';
import blogCategoriesSlice from '../slice/blogCategoriesSlice/blogCategoriesSlice';
import postsSlice from '../slice/postsSlice/postsSlice';
import productsSlice from '../slice/productsSlice/productsSlice';
import attributesSlice from '../slice/attributesSlice/attributesSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    categories: categoriesSlice,
    blogCategories: blogCategoriesSlice,
    posts: postsSlice,
    products: productsSlice,
    attributes: attributesSlice
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export const selectAuth = (state: RootState) => state.auth;
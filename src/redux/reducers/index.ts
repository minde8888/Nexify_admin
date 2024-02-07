import { combineReducers } from 'redux';
import authSlice from '../slice/authSlice/authSlice';
import categoriesSlice from '../slice/categoriesSlice/categoriesSlice';
import blogCategoriesSlice from '../slice/blogCategories/blogCategoriesSlice';
import postsSlice from '../slice/postsSlice/postsSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    categories: categoriesSlice,
    blogCategories: blogCategoriesSlice,
    posts: postsSlice
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export const selectAuth = (state: RootState) => state.auth;
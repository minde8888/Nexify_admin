import { combineReducers } from 'redux';
import authSlice from '../slice/authSlice';
import categoriesSlice from '../slice/categoriesSlice';
import blogCategoriesSlice from '../slice/blogCategoriesSlice';
import postsSlice from '../slice/postsSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    categories: categoriesSlice,
    blogCategories: blogCategoriesSlice,
    posts: postsSlice
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export const selectAuth = (state: RootState) => state.auth;
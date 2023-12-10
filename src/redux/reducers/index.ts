import { combineReducers } from 'redux';
import authSlice from '../slice/authSlice';
import categoriesSlice from '../slice/categoriesSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    categories: categoriesSlice
    // user: userSlice,
    // products: productsSlice,
    
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export const selectAuth = (state: RootState) => state.auth;
// export const selectUser = (state: RootState) => state.user;
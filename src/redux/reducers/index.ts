import { combineReducers } from 'redux';
import authSlice from '../slice/authSlice';
import categoriesSlice from '../slice/categoriesSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    categories: categoriesSlice  
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

export const selectAuth = (state: RootState) => state.auth;
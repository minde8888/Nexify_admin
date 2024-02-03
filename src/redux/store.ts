import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './reducers';
import { AuthState } from './slice/authSlice';
import apiMiddleware from '../middleware/apiMiddleware';
import { StoreError } from '../errorHandler/storeError';

type ImmutableCheck = { warnAfter: number };
export type GetDefaultMiddlewareFn = (arg0: { immutableCheck: ImmutableCheck; serializableCheck: boolean }) => any;

interface Action {
    type: string;
    payload: AuthState;
}

export const localStorageMiddleware = ({ getState }: any) => {
    return (next: (arg0: any) => any) => (action: Action) => {
        const result = next(action);
        const authState = getState().data.auth; 
        localStorage.setItem('auth', JSON.stringify(authState));

        return result;
    };
};

const reHydrateStore = () => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth !== null) {
        try {
            return { data: { auth: JSON.parse(storedAuth) } };
        } catch (error:any) {
            localStorage.removeItem('auth');
            throw new StoreError('Failed to parse auth from localStorage', error.message);        
        }
    }
};


export const store: any = configureStore({
    reducer: {
        data: rootReducer
    },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware: GetDefaultMiddlewareFn) =>
        getDefaultMiddleware({
            immutableCheck: { warnAfter: 200 },
            serializableCheck: false
        }).concat(localStorageMiddleware, apiMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();

import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { GetDefaultMiddlewareFn, RootState, localStorageMiddleware, store } from '../redux/store';
import { RenderOptions, render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { ReactElement } from 'react';
import rootReducer from '../redux/reducers';
import apiMiddleware from '../middleware/apiMiddleware';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    initialState?: Partial<RootState>;
    store?: typeof store;
    initialEntries?: string[];
}

export const renderBrowserWithContext = (element: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <Provider store={store}>{element}</Provider>
        </BrowserRouter>
    );
}

export const renderWithContext = (element: React.ReactElement) => {
    return render(<Provider store={store}>{element}</Provider>);
}

export const renderWithRedux = (
    component: ReactElement,
    { initialState, store: customStore = store }: ExtendedRenderOptions = {}
) => {
    const usedStore = initialState
        ? configureStore({ reducer: rootReducer, preloadedState: initialState })
        : customStore;

    return {
        ...render(<Provider store={usedStore}>{component}</Provider>),
        store: usedStore,
    };
};

export const renderWithReduxMemoryRouter = (
    component: ReactElement,
    { initialState = { auth: {} }, store: customStore, initialEntries = ['/'] }: ExtendedRenderOptions = {}
) => {
    const usedStore = customStore || configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware: GetDefaultMiddlewareFn) => getDefaultMiddleware({
            immutableCheck: { warnAfter: 200 },
            serializableCheck: false,
        }).concat(localStorageMiddleware, apiMiddleware),
        preloadedState: initialState,
    });

    return {
        ...render(
            <Provider store={usedStore}>
                <MemoryRouter initialEntries={initialEntries}>
                    {component}
                </MemoryRouter>
            </Provider>,
        ),
        store: usedStore,
    };
};

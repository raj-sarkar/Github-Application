import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { api } from '@api';
import authReducer from '@features/auth/auth.slice';
import followingSlice from '@features/following/following.slice';
import snackbarReducer from '@features/snackbar/snackbar.slice';
import themeSlice from '@features/theme/theme.slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    snackbar: snackbarReducer,
    following: followingSlice,
    theme: themeSlice,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'theme'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const authStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(api.middleware),
});

export const persistor = persistStore(authStore);

export type RootState = ReturnType<typeof authStore.getState>;
export type AppDispatch = typeof authStore.dispatch;

import type { ModifiedSingleUser } from '@models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AuthState } from './auth.slice.types';

const initialState: AuthState = {
    authUser: null,
    authToken: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{ user: ModifiedSingleUser; token: string }>,
        ) => {
            const { user, token } = action.payload;
            return {
                ...state,
                authUser: user,
                authToken: token,
            };
        },
        logout: () => ({
            authUser: null,
            authToken: null,
        }),
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

import { THEME_MODES } from '@constant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ThemeState } from './theme.types';

const initialState: ThemeState = {
    mode: 'light',
};

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setMode: (
            _,
            action: PayloadAction<{ mode: (typeof THEME_MODES)[number] }>,
        ) => ({
            mode: action.payload.mode,
        }),
    },
});

export const { setMode } = themeSlice.actions;

export default themeSlice.reducer;

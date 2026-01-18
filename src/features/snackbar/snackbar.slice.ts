import { SyntheticEvent } from 'react';

import { SnackbarCloseReason } from '@mui/material';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SnackbarSeverity, SnackbarState } from './snackbar.types';

const initialState: SnackbarState = {
    open: false,
    message: '',
    severity: 'info',
    autoHideDuration: 0,
};

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar: (
            _,
            action: PayloadAction<{
                message: string;
                severity?: SnackbarSeverity;
                autoHideDuration?: number;
            }>,
        ) => ({
            open: true,
            message: action.payload.message,
            severity: action.payload.severity ?? 'error',
            autoHideDuration: action.payload.autoHideDuration ?? 0,
        }),
        hideSnackbar: (
            state,
            action: PayloadAction<{
                event: SyntheticEvent | Event;
                reason?: SnackbarCloseReason;
            }>,
        ) => {
            if (action.payload.reason === 'clickaway') return;
            return {
                ...state,
                open: false,
                message: '',
            };
        },
    },
});

export const { hideSnackbar, showSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;

import {
    Alert as MuiAlert,
    Snackbar as MuiSnackbar,
    SnackbarCloseReason,
} from '@mui/material';

import { hideSnackbar } from '@features/snackbar';
import { useAppDispatch, useAppSelector } from '@hooks';

/**
 * Component to render snackbar
 * @returns JSX Element
 */
export const Snackbar = () => {
    const dispatch = useAppDispatch();

    const { open, message, severity, autoHideDuration } = useAppSelector(
        (state) => state.snackbar,
    );

    /**
     * @param event snackbar closing event
     * @param reason reason of closing event
     */
    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        dispatch(hideSnackbar({ event, reason }));
    };

    return (
        <MuiSnackbar
            open={open}
            autoHideDuration={autoHideDuration !== 0 ? autoHideDuration : null}
            onClose={(e, r) => handleClose(e, r)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <MuiAlert
                severity={severity}
                onClose={handleClose}
                variant="filled"
            >
                {message}
            </MuiAlert>
        </MuiSnackbar>
    );
};

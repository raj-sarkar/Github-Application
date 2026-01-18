/**
 * Types of severity for snackbar
 */
export type SnackbarSeverity = 'success' | 'error' | 'info' | 'warning';

/**
 * Props in snackbar initial state
 * @property open - true if snackbar is open
 * @property message - string to show in snackbar
 * @property severity - type of severity of snackbar
 * @property autoHideDuration - true if snackbar should be
 */
export type SnackbarState = {
    open: boolean;
    message: string;
    severity: SnackbarSeverity;
    autoHideDuration: number;
};

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { authStore } from '@store';
import { getTheme } from '@theme';

import type { ProvidersProps } from './Providers.types';

/**
 * Component to provide all providers to the element
 * @param children - child node element
 * @returns JSX Element
 */
export const Providers = (props: ProvidersProps) => {
    const { children } = props;
    const theme = getTheme('dark');

    return (
        <Provider store={authStore}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>{children}</BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
};

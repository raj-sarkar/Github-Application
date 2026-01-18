import { useMediaQuery, useTheme } from '@mui/material';

import { LoginForm } from '@containers/LoginForm';

/**
 * Page that contains all elements of login
 * @returns JSX Element
 */
export const Login = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return <LoginForm isDesktop={isDesktop} />;
};

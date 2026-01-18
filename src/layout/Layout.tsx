import { Box as MuiBox, Stack as MuiStack } from '@mui/material';

import { Footer } from '@components/Footer';
import { Header } from '@containers/Header';

import type { LayoutProps } from './Layout.types';

/**
 * Component to define the layout of the contents
 * @param props - Props for layout
 * @param props.children - child nodes
 * @param props.showLoginButton - true if login button has to be shown
 * @returns JSX Element
 */
export const Layout = (props: LayoutProps) => {
    const { children, showLoginButton = true } = props;

    return (
        <MuiStack justifyContent="space-between" minHeight="100vh">
            <MuiBox>
                <Header showLoginButton={showLoginButton} />
                {children}
            </MuiBox>
            <Footer />
        </MuiStack>
    );
};

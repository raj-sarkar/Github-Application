import { useMediaQuery, useTheme } from '@mui/material';

import { HeaderContent } from '@containers/HeaderContent';

import { StyledBox } from './Header.styles';
import { HeaderProps } from './Header.types';

/**
 * Container of header that container the HeaderContent container
 * @param props - props for header container
 * @param props.showLoginButton - true if login button has to be shown
 * @returns JSX Element
 */
export const Header = (props: HeaderProps) => {
    const { showLoginButton } = props;

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <StyledBox
            padding={isDesktop ? theme.spacing(3, 6, 4) : theme.spacing(4)}
        >
            <HeaderContent
                isDesktop={isDesktop}
                showLoginButton={showLoginButton}
            />
        </StyledBox>
    );
};

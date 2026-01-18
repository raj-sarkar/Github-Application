import { useNavigate } from 'react-router-dom';

import { Box as MuiBox, useMediaQuery, useTheme } from '@mui/material';

import NotFoundImage from '@assets/imgs/not_found.svg';
import { NotFound as NotFoundComponent } from '@components/NotFound';
import { ROUTE_PATH } from '@constant';

/**
 * Page to contain all components for not found
 * @returns JSX Element
 */
export const NotFound = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const navigate = useNavigate();

    return (
        <MuiBox padding={isDesktop ? 6 : 4}>
            <NotFoundComponent
                isDesktop={isDesktop}
                imgSrc={NotFoundImage}
                heading="Page not found"
                description="The page you are looking for is not available"
                buttonText="Go To Home"
                onClick={() => void navigate(ROUTE_PATH.HOME)}
            />
        </MuiBox>
    );
};

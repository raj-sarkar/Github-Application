import { useParams } from 'react-router-dom';

import { Box as MuiBox, useMediaQuery, useTheme } from '@mui/material';

import { Following as FollowingContainer } from '@containers/Following';

/**
 * Page for Following route
 * @returns JSX Element
 */
export const Following = () => {
    const { username } = useParams();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <MuiBox padding={isDesktop ? 6 : 4}>
            <FollowingContainer username={username ?? ''} />
        </MuiBox>
    );
};

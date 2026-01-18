import { useParams } from 'react-router-dom';

import { Box as MuiBox, useMediaQuery, useTheme } from '@mui/material';

import { Followers as FollowersContainer } from '@containers/Followers';

/**
 * Page for Followers route
 * @returns JSX Element
 */
export const Followers = () => {
    const { username } = useParams();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <MuiBox padding={isDesktop ? 6 : 4}>
            <FollowersContainer username={username ?? ''} />
        </MuiBox>
    );
};

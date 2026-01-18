import { useParams } from 'react-router-dom';

import { Box as MuiBox, useMediaQuery, useTheme } from '@mui/material';

import { Profile as ProfileContainer } from '@containers/Profile';
import { RepoTable } from '@containers/RepoTable';

/**
 * Page for profile route
 * @returns JSX ELement
 */
export const Profile = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const { username } = useParams();

    return (
        <MuiBox padding={isDesktop ? 6 : 4}>
            <ProfileContainer isDesktop={isDesktop} username={username ?? ''} />
            <RepoTable isDesktop={isDesktop} username={username ?? ''} />
        </MuiBox>
    );
};

import { useEffect } from 'react';

import type { LocalStorageData } from 'App.types';
import { RouterProvider } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';
import type { Theme } from '@mui/material/styles';

import { Snackbar } from '@containers/Snackbar';
import { logout } from '@features/auth';
import { setFollowingList } from '@features/following';
import { showSnackbar } from '@features/snackbar';
import { useAppDispatch, useAppSelector } from '@hooks';
import { routes } from '@routes';
import { useLazyGetFollowingsOfAuthenticatedUserQuery } from '@services';
import { getTheme } from '@theme';

/**
 *
 * @returns Component that holds all routes wrapped inside providers
 */
export const App = () => {
    const [getFollowing] = useLazyGetFollowingsOfAuthenticatedUserQuery();
    const authToken = useAppSelector((state) => state.auth.authToken);
    const mode = useAppSelector((state) => state.theme.mode);
    const dispatch = useAppDispatch();

    const theme: Theme = getTheme(mode);

    /**
     * Synchronize Logout/Login State Across Tabs
     * Listens for 'storage' events (triggered by other tabs) to check if
     * the authentication token has changed in localStorage. If it has,
     * this tab dispatches a logout action to maintain state consistency.
     */
    useEffect(() => {
        /**
         * Checks if token is chnaged . If its is changed then dispatches logout
         * @param event - Storage event
         */
        const handleStorage = (event: StorageEvent) => {
            if (event.key === 'persist:root') {
                const localData = JSON.parse(
                    event.newValue ?? '{}',
                ) as LocalStorageData;
                const localToken = localData?.auth?.authToken ?? '';

                if (localToken !== authToken) {
                    dispatch(logout());
                }
            }
        };

        window.addEventListener('storage', handleStorage);

        return () => window.removeEventListener('storage', handleStorage);
    }, [authToken, dispatch]);

    /**
     * Fetches the list of user followed by authenticated user
     */
    useEffect(() => {
        const fetchFollowingList = async () => {
            if (!authToken) return;

            try {
                const followingUserList = await getFollowing().unwrap();
                const followingUsernames = followingUserList.map(
                    (user) => user.name,
                );
                dispatch(setFollowingList({ following: followingUsernames }));
            } catch {
                dispatch(
                    showSnackbar({
                        message: 'Error while fetching following list',
                    }),
                );
            }
        };

        void fetchFollowingList();
    }, [authToken, dispatch, getFollowing]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={routes} />
            <Snackbar />
        </ThemeProvider>
    );
};

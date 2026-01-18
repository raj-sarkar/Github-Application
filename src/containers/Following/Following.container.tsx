import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

import { ROUTE_PATH } from '@constant';
import { UserList } from '@containers/UserList';
import { showSnackbar } from '@features/snackbar';
import { useAppDispatch } from '@hooks';
import { ModifiedUser } from '@models';
import { useLazyGetFollowingQuery } from '@services';

import type { FollowingProps } from './Following.types';

/**
 * Following container
 * @param props Props for Following container
 * @param props.username - username of user
 * @returns JSX Element
 */
export const Following = (props: FollowingProps) => {
    const { username } = props;

    const [
        getFollowing,
        { isLoading: isLoadingUsers, isFetching: isFetchingUsers, isError },
    ] = useLazyGetFollowingQuery();
    const dispatch = useAppDispatch();

    const [followedUsers, setFollowedUsers] = useState<ModifiedUser[]>();

    useEffect(() => {
        /**
         * Fteches following list through query
         */
        const fetchFollowing = async () => {
            try {
                const res = await getFollowing(username).unwrap();
                setFollowedUsers(res);
            } catch {
                dispatch(
                    showSnackbar({
                        message: 'Error while fetching following list',
                        autoHideDuration: 3000,
                    }),
                );
            }
        };

        void fetchFollowing();
    }, [username, getFollowing, dispatch]);

    if (isError) return <Navigate to={ROUTE_PATH.NOT_FOUND} />;

    return (
        <UserList
            heading={`Following of ${username}`}
            description={`List of users ${username} follows`}
            userList={followedUsers ?? []}
            isLoading={isLoadingUsers || isFetchingUsers}
        />
    );
};

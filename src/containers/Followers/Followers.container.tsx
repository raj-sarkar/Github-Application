import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

import { ROUTE_PATH } from '@constant';
import { UserList } from '@containers/UserList';
import { showSnackbar } from '@features/snackbar';
import { useAppDispatch } from '@hooks';
import { ModifiedUser } from '@models';
import { useLazyGetFollowersQuery } from '@services';

import type { FollowersProps } from './Followers.types';

/**
 * Followers container
 * @param props Props for Followers container
 * @param props.username - username of user
 * @returns JSX Element
 */
export const Followers = (props: FollowersProps) => {
    const { username } = props;

    const [
        getFollowers,
        { isLoading: isLoadingUsers, isFetching: isFetchingUsers, isError },
    ] = useLazyGetFollowersQuery();
    const dispatch = useAppDispatch();

    const [followerUsers, setFollowerUsers] = useState<ModifiedUser[]>();

    useEffect(() => {
        /**
         * Fetches followers list through query
         */
        const fetchFollowers = async () => {
            try {
                const res = await getFollowers(username).unwrap();
                setFollowerUsers(res);
            } catch {
                dispatch(
                    showSnackbar({
                        message: 'Error while fetching follower list',
                        autoHideDuration: 3000,
                    }),
                );
            }
        };
        void fetchFollowers();
    }, [username, dispatch, getFollowers]);

    if (isError) return <Navigate to={ROUTE_PATH.NOT_FOUND} />;

    return (
        <UserList
            heading={`Followers of ${username}`}
            description={`List of users who follows ${username}`}
            userList={followerUsers ?? []}
            isLoading={isLoadingUsers || isFetchingUsers}
        />
    );
};

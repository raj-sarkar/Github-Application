import { useCallback, useEffect, useRef, useState } from 'react';

import { UserList } from '@containers/UserList';
import { showSnackbar } from '@features/snackbar';
import { useAppDispatch, useDebounceCallback } from '@hooks';
import type { ModifiedUser } from '@models';
import { useLazyGetRandomUsersQuery, useLazyGetUserQuery } from '@services';
import { getRandomId } from '@utils';

/**
 * Container to render the heading , refresh button and user lists
 * @returns JSX Element
 */
export const Suggestions = () => {
    const [
        getRandomUserList,
        { isLoading: isLoadingUserList, isFetching: isFetchingUserList },
    ] = useLazyGetRandomUsersQuery();
    const [
        getUserByUsername,
        { isLoading: isLoadingUser, isFetching: isFetchingUser },
    ] = useLazyGetUserQuery();
    const dispatch = useAppDispatch();

    const [userList, setUserList] = useState<ModifiedUser[]>([]);
    const [isFetchingDetails, setIsFetchingDetails] = useState<boolean>(false);
    const [loadingIndex, setLoadingIndex] = useState<number[]>([]);
    const [page, setPage] = useState<number>(0);

    const MAX_USERS_COUNT = 12;
    const hasFetched = useRef(false);
    const isLoading =
        isLoadingUserList ||
        isFetchingUserList ||
        isLoadingUser ||
        isFetchingUser;

    /**
     * Function to get random users to suggest
     * @returns Promise<void>
     */
    const fetchRandomUsersBatch = useCallback(
        async (perPage = MAX_USERS_COUNT, inserAt = -1) => {
            setIsFetchingDetails(true);

            try {
                const sinceId = getRandomId();
                const randomUsers = await getRandomUserList({
                    sinceId,
                    perPage,
                }).unwrap();

                if (!randomUsers) return;

                /**
                 * As the list user response doesnot provide all required field,
                 * We have fetch details for each users in the list
                 */
                const results = await Promise.allSettled(
                    randomUsers.map((randomUser) =>
                        getUserByUsername(randomUser.name).unwrap(),
                    ),
                );

                results.forEach((response, index) => {
                    if (response.status === 'fulfilled') {
                        if (inserAt === -1) {
                            setUserList((prev) => [
                                ...prev,
                                randomUsers[index],
                            ]);
                        } else {
                            setUserList((prev) => {
                                const newUsers = [...prev];
                                newUsers.splice(inserAt, 0, randomUsers[index]);
                                setLoadingIndex((list) =>
                                    list.filter((idx) => idx !== inserAt),
                                );
                                return newUsers;
                            });
                        }
                    } else {
                        void fetchRandomUsersBatch(1);
                    }
                });
            } catch {
                dispatch(
                    showSnackbar({
                        message: 'Error while fetching details',
                        autoHideDuration: 3000,
                    }),
                );
            }

            setIsFetchingDetails(false);
        },
        [dispatch, getRandomUserList, getUserByUsername],
    );

    /**
     * Function to handle click on refresh button
     * @description resets the detailed user list and fetches new users
     */
    const handleRefresh = () => {
        setUserList([]);
        void fetchRandomUsersBatch();
    };

    /**
     * Function to handle click on cross button of user.
     * @description Removes the user and adds a new user to suggest
     * @param username - username of the user to remove
     * @returns Promise<void>
     */
    const handleRemoveUser = (username: string) => {
        let index = -1;

        setUserList((prev) => {
            index = prev.findIndex((user) => user.name === username);

            if (index === -1) return prev;

            setLoadingIndex((list) => [...list, index]);

            return prev.filter((_, i) => i !== index);
        });

        void fetchRandomUsersBatch(1, index);
    };

    /**
     * Checks if viewport is close to the end of scroll and fetches new users
     */
    const handleScroll = () => {
        if (
            document.body.scrollHeight - 500 <
                window.scrollY + window.innerHeight &&
            !(isLoading || isFetchingDetails)
        ) {
            setPage((prev) => prev + 1);
        }
    };
    const debounceScroll = useDebounceCallback(() => {
        handleScroll();
    }, 100);

    useEffect(() => {
        window.addEventListener('scroll', debounceScroll);

        return () => window.removeEventListener('scroll', debounceScroll);
    }, [isLoading, isFetchingDetails, debounceScroll]);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        void fetchRandomUsersBatch();
    }, [fetchRandomUsersBatch]);

    useEffect(() => {
        if (page === 0) return;

        void fetchRandomUsersBatch();
    }, [page, fetchRandomUsersBatch]);

    return (
        <UserList
            heading="Suggested GitHub Users"
            description="Find and follow interesting developers and contributors based on your connections and coding interests"
            isLoading={isLoading || isFetchingDetails}
            userList={userList}
            hasButton
            buttonText="Refresh"
            handleClick={handleRefresh}
            hasCross
            handleRemovedUser={handleRemoveUser}
            maxUserCount={MAX_USERS_COUNT}
            loadingIndex={loadingIndex}
        />
    );
};

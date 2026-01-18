import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {
    Box as MuiBox,
    CircularProgress as MuiCircularProgress,
    Stack as MuiStack,
    useTheme,
} from '@mui/material';

import { Icon } from '@components/Icon';
import { Typography } from '@components/Typography';
import { UserDetails, type UserDetailsItem } from '@components/UserDetails';
import { ROUTE_PATH } from '@constant';
import { setFollowingList } from '@features/following';
import { showSnackbar } from '@features/snackbar';
import { useAppDispatch, useAppSelector, useDebounceCallback } from '@hooks';
import { ModifiedSingleUser } from '@models';
import {
    useFollowUserMutation,
    useLazyGetUserQuery,
    useUnfollowUserMutation,
} from '@services';
import { ProfileDetailsSkeleton } from '@skeletons/ProfileDetails';

import { StyledAvatar, StyledButton } from './Profile.styles';
import type { ProfileProps } from './Profile.types';

/**
 * Container to show user details
 * @param props- Props for profile container
 * @param props.isDesktop - true if view width is desktop
 * @param props.username - username of user
 * @returns JSX Element
 */
export const Profile = (props: ProfileProps) => {
    const { isDesktop, username } = props;

    const authUser = useAppSelector((state) => state.auth.authUser);
    const authFollowing = useAppSelector(
        (state) => state.following.followingUsers,
    );
    const [
        getUserDetails,
        { isLoading: isLoadingUser, isFetching: isFetchingUser, isError },
    ] = useLazyGetUserQuery();
    const [triggerFollow] = useFollowUserMutation();
    const [triggerUnfollow] = useUnfollowUserMutation();
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const [user, setUser] = useState<ModifiedSingleUser>();
    const [isLoadingFollow, setIsLoadingFollow] = useState<boolean>(false);

    const isFollowed = authFollowing.includes(username);

    /**
     *
     * @description takes username and follows that user if not followed already, unfollows otherwise
     * @param usernameToFollow - username of the user to follow/unfollow
     */
    const handleClickOnFollow = async (usernameToFollow: string) => {
        setIsLoadingFollow(true);

        try {
            if (isFollowed) {
                await triggerUnfollow(usernameToFollow);
                const updatedFollowing = authFollowing.filter(
                    (prev) => prev !== usernameToFollow,
                );
                dispatch(setFollowingList({ following: updatedFollowing }));
            } else {
                await triggerFollow(usernameToFollow);
                dispatch(
                    setFollowingList({
                        following: [...authFollowing, usernameToFollow],
                    }),
                );
            }
        } catch {
            dispatch(
                showSnackbar({
                    message: 'Error in follow/unfollow',
                    autoHideDuration: 3000,
                }),
            );
        }

        setIsLoadingFollow(false);
    };

    /**
     * Debounced function of handle click function on follow button
     * @returns void
     */
    const debouncedClick = useDebounceCallback<string>((usernameToFollow) => {
        void handleClickOnFollow(usernameToFollow);
    });

    useEffect(() => {
        /**
         * Fetches user details by username through query
         */
        const fetchDetails = async () => {
            try {
                const res = await getUserDetails(username).unwrap();
                setUser(res);
            } catch {
                dispatch(
                    showSnackbar({
                        message: 'Error while fetching user details',
                        autoHideDuration: 3000,
                    }),
                );
            }
        };

        void fetchDetails();
    }, [username, dispatch, getUserDetails]);

    const userDetailsData: UserDetailsItem[] = [
        {
            id: 'name',
            title: 'Name',
            text: user?.name,
        },
        {
            id: 'email',
            title: 'Email',
            text: user?.email,
            link: `mailto:${user?.email}`,
        },
        {
            id: 'location',
            title: 'Location',
            text: user?.location,
        },
        {
            id: 'follower',
            title: 'Follower',
            text: user?.followers,
            link: `/followers/${user?.username}`,
        },
        {
            id: 'following',
            title: 'Following',
            text: user?.following,
            link: `/following/${user?.username}`,
        },
        {
            id: 'blog',
            title: 'Blog',
            text: user?.blog,
            link: `${user?.blog}`,
            isTargetBlank: true,
        },
    ];

    if (isLoadingUser || isFetchingUser) {
        return <ProfileDetailsSkeleton isDesktop={isDesktop} />;
    }

    if (isError) return <Navigate to={ROUTE_PATH.NOT_FOUND} />;

    return (
        <MuiStack
            direction={isDesktop ? 'row' : 'column'}
            gap={isDesktop ? 8 : 4}
        >
            <MuiStack direction="row" gap={isDesktop ? 8 : 4}>
                <MuiStack gap={4} alignItems="center">
                    <StyledAvatar
                        src={user?.avatarURL}
                        alt={`Profile image of ${username}`}
                    />
                </MuiStack>
                <MuiBox>
                    <Typography variant={isDesktop ? 'h1' : 'h3'}>
                        {user?.username}
                    </Typography>
                    <MuiStack gap={2} marginTop={4}>
                        {userDetailsData.map((item) => (
                            <UserDetails
                                item={item}
                                isDesktop={isDesktop}
                                key={item.id}
                            />
                        ))}
                    </MuiStack>
                </MuiBox>
            </MuiStack>
            <MuiStack flexGrow={2} alignItems="center" justifyContent="center">
                {authUser && username !== authUser.username && (
                    <StyledButton
                        onClick={() => debouncedClick(username)}
                        disabled={isLoadingFollow}
                        backgroundColor={theme.palette.primary.dark}
                    >
                        <MuiStack
                            direction="row"
                            gap={2}
                            alignItems="center"
                            padding={isDesktop ? theme.spacing(1, 3) : 0}
                        >
                            {isLoadingFollow ? (
                                <MuiCircularProgress size={30} />
                            ) : (
                                <>
                                    <Typography
                                        variant={isDesktop ? 'h3' : 'subtitle2'}
                                        color={theme.palette.grey[50]}
                                    >
                                        {isFollowed ? 'Unfollow' : 'Follow'}
                                    </Typography>
                                    <Icon
                                        icon={
                                            isFollowed
                                                ? PersonRemoveIcon
                                                : PersonAddIcon
                                        }
                                        iconColor={
                                            theme.palette.background.default
                                        }
                                        size={isDesktop ? 'sm' : 'xs'}
                                    />
                                </>
                            )}
                        </MuiStack>
                    </StyledButton>
                )}
                <Typography
                    variant={isDesktop ? 'h3' : 'body1'}
                    lines={5}
                    marginTop={4}
                >
                    Bio:{' '}
                    <Typography
                        variant={isDesktop ? 'h4' : 'body2'}
                        component="span"
                        sx={{ display: 'inline' }}
                        color={theme.palette.grey[500]}
                    >
                        {user?.bio ?? 'NA'}
                    </Typography>
                </Typography>
            </MuiStack>
        </MuiStack>
    );
};

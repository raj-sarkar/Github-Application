import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
    Box as MuiBox,
    CircularProgress as MuiCircularProgress,
    Stack as MuiStack,
    useMediaQuery,
    useTheme,
} from '@mui/material';

import { Avatar } from '@components/Avatar';
import { Icon } from '@components/Icon';
import { Typography } from '@components/Typography';
import { UserDetails, UserDetailsItem } from '@components/UserDetails';
import { setFollowingList } from '@features/following';
import { showSnackbar } from '@features/snackbar';
import { useAppDispatch, useAppSelector, useDebounceCallback } from '@hooks';
import {
    useFollowUserMutation,
    useGetUserQuery,
    useUnfollowUserMutation,
} from '@services';
import { SuggestedUserSkeleton } from '@skeletons/SuggestedUser';

import {
    StyledCard,
    StyledCrossButton,
    StyledFollowButton,
} from './UserCard.styles';
import type { HandleClickOnFollowProps, UserCardProps } from './UserCard.types';

/**
 * Component to render user details
 * @param props - Props for suggested user component
 * @param props.user - details of the user
 * @param props.handleRemovedUser - function to be called upon clicking on cross 'X'
 * @param props.hasCross - true if card should have cross button
 * @returns JSX Element
 */
export const UserCard = (props: UserCardProps) => {
    const { user, handleRemovedUser, hasCross } = props;

    const [triggerFollow] = useFollowUserMutation();
    const [triggerUnfollow] = useUnfollowUserMutation();
    const {
        data: detailedUser,
        isLoading: isLoadingUser,
        isFetching: isFetchingUser,
    } = useGetUserQuery(user.name);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authUser = useAppSelector((state) => state.auth.authUser);
    const authFollowing = useAppSelector(
        (state) => state.following.followingUsers,
    );
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
    const [isLoadingFollow, setIsLoadingFollow] = useState<boolean>(false);

    const userDetailsData: UserDetailsItem[] = [
        {
            id: 'email',
            title: 'Email',
            text: detailedUser?.email,
            link: `mailto:${detailedUser?.email}`,
        },
        {
            id: 'location',
            title: 'Location',
            text: detailedUser?.location,
        },
        {
            id: 'follower',
            title: 'Follower',
            text: detailedUser?.followers,
            link: `/followers/${detailedUser?.username}`,
        },
        {
            id: 'following',
            title: 'Following',
            text: detailedUser?.following,
            link: `/following/${detailedUser?.username}`,
        },
        {
            id: 'blog',
            title: 'Blog',
            text: detailedUser?.blog,
            link: `${detailedUser?.blog}`,
            isTargetBlank: true,
        },
        {
            id: 'bio',
            title: 'Bio',
            text: detailedUser?.bio,
            isTargetBlank: true,
        },
    ];

    /**
     * Handles the key down event on a div element.
     * * If the event did not originate from the current element (i.e., it's a bubble from a child),
     * the function returns early.
     * * If the pressed key is 'Enter', it navigates to the detailedUser's profile page.
     *
     * @param event The keyboard event object.
     * @returns void
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.target !== event.currentTarget) return;

        if (event.key === 'Enter') {
            void navigate(`/profile/${detailedUser?.username}`);
        }
    };

    /**
     * @description function to handle click on follow/unfollow button
     * @param username - username of the detailedUser to follow/unfollow
     * @param isFollowed - true if detailedUser is already followed
     */
    const handleClickOnFollow = async (
        username: string,
        isFollowed: boolean,
    ) => {
        setIsLoadingFollow(true);

        try {
            if (isFollowed) {
                await triggerUnfollow(username);
                const updatedFollowing = authFollowing.filter(
                    (prev) => prev !== username,
                );
                dispatch(setFollowingList({ following: updatedFollowing }));
            } else {
                await triggerFollow(username);
                dispatch(
                    setFollowingList({
                        following: [...authFollowing, username],
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
    const debouncedClick = useDebounceCallback<HandleClickOnFollowProps>(
        ({ username, isFollowed }) => {
            void handleClickOnFollow(username, isFollowed);
        },
    );

    if (isLoadingUser || isFetchingUser) return <SuggestedUserSkeleton />;

    return (
        <StyledCard
            onClick={() => void navigate(`/profile/${detailedUser?.username}`)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            {hasCross && handleRemovedUser && (
                <StyledCrossButton
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRemovedUser(detailedUser?.username ?? '');
                    }}
                    icon={CloseIcon}
                />
            )}
            <MuiStack direction="row" gap={4} alignItems="center">
                <Avatar
                    src={detailedUser?.avatarURL}
                    alt={`${detailedUser?.username} profile image`}
                />
                <MuiStack gap={2}>
                    <MuiBox>
                        <Typography variant="h3">
                            {detailedUser?.username}
                        </Typography>
                        <Typography
                            variant="h4"
                            color={theme.palette.grey[500]}
                            lines={2}
                        >
                            Name: {detailedUser?.name ?? 'NA'}
                        </Typography>
                    </MuiBox>
                    <MuiStack direction="row" gap={2}>
                        {authUser &&
                            authUser.username !== detailedUser?.username && (
                                <StyledFollowButton
                                    backgroundColor={theme.palette.grey[300]}
                                    fontColor={theme.palette.grey[900]}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        debouncedClick({
                                            username:
                                                detailedUser?.username ?? '',
                                            isFollowed: authFollowing.includes(
                                                detailedUser?.username ?? '',
                                            ),
                                        });
                                    }}
                                >
                                    {isLoadingFollow ? (
                                        <MuiCircularProgress size={20} />
                                    ) : (
                                        <Typography variant="h4">
                                            {authFollowing.includes(
                                                detailedUser?.username ?? '',
                                            )
                                                ? 'Unfollow'
                                                : 'Follow'}
                                        </Typography>
                                    )}
                                </StyledFollowButton>
                            )}
                        <a
                            href={detailedUser?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Visit profile"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Icon size="sm" icon={OpenInNewIcon} />
                        </a>
                    </MuiStack>
                </MuiStack>
            </MuiStack>
            <MuiStack marginTop={2} gap={2}>
                {userDetailsData.map((item) => (
                    <UserDetails
                        item={item}
                        key={item.id}
                        isDesktop={isDesktop}
                    />
                ))}
            </MuiStack>
        </StyledCard>
    );
};

import { Fragment } from 'react';

import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import { Stack as MuiStack, useTheme } from '@mui/material';

import { Icon } from '@components/Icon';
import { PageHeader } from '@components/PageHeader';
import { Typography } from '@components/Typography';
import { UserCard } from '@containers/UserCard';
import { SuggestedUserSkeleton } from '@skeletons/SuggestedUser';

import { StyledBox } from './UserList.styles';
import type { UserListProps } from './UserList.types';

/**
 * Container to render List of user as card
 * @param props - Props for UserList container
 * @param props.heading - heading of page
 * @param props.description - description of page
 * @param props.userList - list of users to show
 * @param props.isLoading - true if loading state is active
 * @param props.hasButton - true if there is refresh button
 * @param props.handleClick - function to handle click on refresh button
 * @param props.buttonText - text to show inside button
 * @param props.hasCross - true if user card should have cross button
 * @param props.handleRemovedUser - function to handle click on cross button
 * @returns JSX Element
 */
export const UserList = (props: UserListProps) => {
    const {
        description,
        heading,
        isLoading: isLoadingUserList,
        userList,
        hasButton = false,
        handleClick,
        buttonText,
        handleRemovedUser,
        hasCross,
        maxUserCount = 6,
        loadingIndex = [],
    } = props;

    const theme = useTheme();

    return (
        <>
            <PageHeader
                heading={heading}
                description={description}
                hasButton={hasButton}
                handleClick={handleClick}
                buttonText={buttonText}
                isLoading={isLoadingUserList}
            />
            <MuiStack flexWrap="wrap" direction="row" gap={4} marginTop={4}>
                {userList.map((user, index) => (
                    <Fragment key={user.name}>
                        {loadingIndex.includes(index) && (
                            <SuggestedUserSkeleton />
                        )}
                        <UserCard
                            user={user}
                            handleRemovedUser={handleRemovedUser}
                            hasCross={hasCross}
                        />
                    </Fragment>
                ))}
                {loadingIndex.includes(userList.length) && (
                    <SuggestedUserSkeleton />
                )}
                {isLoadingUserList &&
                    loadingIndex.length === 0 &&
                    Array.from({
                        length: maxUserCount,
                    }).map((_, i) => <SuggestedUserSkeleton key={i} />)}
                {!isLoadingUserList && userList.length === 0 && (
                    <MuiStack alignItems="center" mx="auto" mt={8} gap={2}>
                        <StyledBox>
                            <Icon icon={PeopleAltTwoToneIcon} size="lg" />
                        </StyledBox>
                        <Typography
                            variant="h2"
                            color={theme.palette.grey[500]}
                        >
                            No users to show
                        </Typography>
                    </MuiStack>
                )}
            </MuiStack>
        </>
    );
};

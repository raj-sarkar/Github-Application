import type { ModifiedUser } from '@models';

/**
 * Props of follow button
 * @property username - username of the user to follow
 * @property isFollowed - true if user is followed
 */
export type HandleClickOnFollowProps = {
    username: string;
    isFollowed: boolean;
};

/**
 * Props for user card user component
 * @property user - details of the user
 * @property handleRemovedUser - function to be called upon clicking on cross 'X'
 * @property hasCross - true if card should have cross button
 */
export type UserCardProps = {
    user: ModifiedUser;
    hasCross?: boolean;
    handleRemovedUser?: (username: string) => void;
};

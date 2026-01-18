import { ModifiedUser } from '@models';

/**
 * Props for UserList container
 * @property heading - heading of page
 * @property description - description of page
 * @property userList - list of users to show
 * @property isLoading - true if loading state is active
 * @property hasButton - true if there is refresh button
 * @property handleClick - function to handle click on refresh button
 * @property hasCross - true if user card should have cross button
 * @property handleRemovedUser - function to handle click on cross button
 * @property maxUserCount - number of max user for skeleton rendering
 * @property buttonText - text to show inside button
 */
export type UserListProps = {
    heading: string;
    description: string;
    userList: ModifiedUser[];
    isLoading: boolean;
    hasButton?: boolean;
    buttonText?: string;
    handleClick?: () => void;
    hasCross?: boolean;
    handleRemovedUser?: (username: string) => void;
    maxUserCount?: number;
    loadingIndex?: number[];
};

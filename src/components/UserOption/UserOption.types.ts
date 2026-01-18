import type { ModifiedUser } from '@models';

/**
 * Props for user option component
 * @property option - details of user to show
 * @property isDesktop - boolean value of view width is desktop or not
 */
export type UserOptionProps = {
    option: ModifiedUser;
    isDesktop: boolean;
};

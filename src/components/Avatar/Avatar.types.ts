import { AvatarProps as MuiAvatarProps } from '@mui/material';

import { AVATAR_SIZE } from '@constant';

/**
 * Props for styled avatar
 * @property size - size of the avatar
 * @property isCursorPointer - boolean value cursor is pointer or not
 */
export type StyledAvatarProps = MuiAvatarProps & {
    size?: keyof typeof AVATAR_SIZE;
    isCursorPointer?: boolean;
};

/**
 * Props for avatar component
 */
export type AvatarProps = StyledAvatarProps;

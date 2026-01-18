import { Avatar as MuiAvatar, styled } from '@mui/material';

import { AVATAR_SIZE } from '@constant';

import { StyledAvatarProps } from './Avatar.types';

const customAvatarProps: PropertyKey[] = ['size', 'isCursorPointer'];

export const StyledAvatar = styled(MuiAvatar, {
    shouldForwardProp: (prop) => !customAvatarProps.includes(prop),
})<StyledAvatarProps>(
    ({
        theme: { palette, typography },
        size = 'lg',
        isCursorPointer = false,
    }) => ({
        width: typography.pxToRem(AVATAR_SIZE[size]),
        height: typography.pxToRem(AVATAR_SIZE[size]),
        cursor: isCursorPointer ? 'pointer' : 'auto',
        outline: 'none',
        border: 'none',

        '&:focus': {
            outline: `${typography.pxToRem(1)} solid ${palette.grey[900]}`,
        },
    }),
);

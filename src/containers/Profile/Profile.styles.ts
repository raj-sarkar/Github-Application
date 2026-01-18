import { styled } from '@mui/material';

import { Avatar } from '@components/Avatar';
import { Button } from '@components/Button';
import { PROFILE_AVATAR_SIZE } from '@constant';

export const StyledAvatar = styled(Avatar)(
    ({
        theme: {
            breakpoints,
            typography: { pxToRem },
        },
    }) => ({
        width: pxToRem(PROFILE_AVATAR_SIZE.sm),
        height: pxToRem(PROFILE_AVATAR_SIZE.sm),

        [breakpoints.up('sm')]: {
            width: pxToRem(PROFILE_AVATAR_SIZE.md),
            height: pxToRem(PROFILE_AVATAR_SIZE.md),
        },

        [breakpoints.up('lg')]: {
            width: pxToRem(PROFILE_AVATAR_SIZE.lg),
            height: pxToRem(PROFILE_AVATAR_SIZE.lg),
        },
    }),
);

export const StyledButton = styled(Button)(
    ({
        theme: {
            breakpoints,
            typography: { pxToRem },
        },
    }) => ({
        minWidth: pxToRem(150),
        height: pxToRem(35),

        [breakpoints.up('sm')]: {
            minWidth: pxToRem(200),
            height: pxToRem(45),
        },
    }),
);

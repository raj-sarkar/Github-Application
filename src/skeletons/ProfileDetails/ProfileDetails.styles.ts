import { Skeleton as MuiSkeleton, styled } from '@mui/material';

import { PROFILE_AVATAR_SIZE } from '@constant';

export const StyledCircularSkeleton = styled(MuiSkeleton)(
    ({ theme: { breakpoints, palette } }) => ({
        backgroundColor: palette.grey[300],
        width: PROFILE_AVATAR_SIZE.sm,
        height: PROFILE_AVATAR_SIZE.sm,

        [breakpoints.up('sm')]: {
            width: PROFILE_AVATAR_SIZE.md,
            height: PROFILE_AVATAR_SIZE.md,
        },

        [breakpoints.up('lg')]: {
            width: PROFILE_AVATAR_SIZE.lg,
            height: PROFILE_AVATAR_SIZE.lg,
        },
    }),
);

export const StyledSkeleton = styled(MuiSkeleton)(({ theme: { palette } }) => ({
    backgroundColor: palette.grey[300],
}));

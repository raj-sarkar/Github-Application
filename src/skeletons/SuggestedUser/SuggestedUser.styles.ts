import { Box as MuiBox, Skeleton as MuiSkeleton, styled } from '@mui/material';

export const StyledBox = styled(MuiBox)(
    ({ theme: { typography, spacing, breakpoints, palette } }) => ({
        padding: spacing(4),
        borderRadius: typography.pxToRem(10),
        width: '100%',
        border: `${typography.pxToRem(1)} solid ${palette.grey[300]}`,

        [breakpoints.up('sm')]: {
            width: `calc(50% - ${spacing(2)})`,
        },

        [breakpoints.up('md')]: {
            width: `calc(33% - ${spacing(2)})`,
        },

        [breakpoints.up('lg')]: {
            width: `calc(25% - ${spacing(3)})`,
        },
    }),
);

export const StyledSkeleton = styled(MuiSkeleton)(({ theme: { palette } }) => ({
    backgroundColor: palette.grey[300],
}));

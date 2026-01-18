import { Card as MuiCard, styled } from '@mui/material';

import { Button } from '@components/Button';
import { IconButton } from '@components/IconButton';

export const StyledCrossButton = styled(IconButton)(
    ({ theme: { palette } }) => ({
        position: 'absolute',
        right: 5,
        top: 5,

        '&:hover': {
            backgroundColor: palette.grey[300],
        },

        '&:focus': {
            backgroundColor: palette.grey[300],
        },
    }),
);

export const StyledCard = styled(MuiCard)(
    ({ theme: { palette, typography, spacing, breakpoints } }) => ({
        position: 'relative',
        cursor: 'pointer',
        backgroundColor: palette.grey[50],
        padding: spacing(4),
        borderRadius: typography.pxToRem(10),
        border: `${typography.pxToRem(1)} solid ${palette.grey[100]}`,
        width: '100%',

        '&:hover': {
            border: `${typography.pxToRem(1)} solid ${palette.grey[300]}`,
            boxShadow: `0 ${typography.pxToRem(4)} ${typography.pxToRem(4)} ${palette.grey[300]}`,
        },

        [breakpoints.up('sm')]: {
            width: `calc(50% - ${typography.pxToRem(8)})`,
        },

        [breakpoints.up('md')]: {
            width: `calc(33% - ${typography.pxToRem(8)})`,
        },

        [breakpoints.up('lg')]: {
            width: `calc(25% - ${typography.pxToRem(12)})`,
        },
    }),
);

export const StyledFollowButton = styled(Button)(
    ({
        theme: {
            typography: { pxToRem },
        },
    }) => ({
        width: pxToRem(100),
        height: pxToRem(35),
    }),
);

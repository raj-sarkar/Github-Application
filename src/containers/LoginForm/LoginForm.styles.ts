import { Box as MuiBox, styled } from '@mui/material';

import { Button } from '@components/Button';

export const StyledBox = styled(MuiBox)(
    ({ theme: { palette, typography, spacing } }) => ({
        margin: `${spacing(20)} auto`,
        width: '90%',
        maxWidth: spacing(100),
        padding: spacing(10, 4),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        border: `${typography.pxToRem(1)} solid ${palette.grey[200]}`,
        borderRadius: `${typography.pxToRem(10)}`,
        boxShadow: `${spacing(0, 1, 1)} ${palette.grey[300]}`,
    }),
);

export const StyledButton = styled(Button)(({ theme: { typography } }) => ({
    marginTop: typography.pxToRem(20),
    width: '70%',
    height: typography.pxToRem(40),
}));

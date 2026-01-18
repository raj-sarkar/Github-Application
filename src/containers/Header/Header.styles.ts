import { Box as MuiBox, styled } from '@mui/material';

export const StyledBox = styled(MuiBox)(
    ({ theme: { palette, typography } }) => ({
        borderBottom: `${typography.pxToRem(1)} solid ${palette.grey[300]}`,
        position: 'sticky',
        top: 0,
        backgroundColor: palette.background.default,
        zIndex: 100,
    }),
);

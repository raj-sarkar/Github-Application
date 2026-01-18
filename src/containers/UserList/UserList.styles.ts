import { Box as MuiBox } from '@mui/material';
import { styled } from '@mui/material';

export const StyledBox = styled(MuiBox)(
    ({ theme: { palette, typography } }) => ({
        border: `${typography.pxToRem(2)} solid ${palette.grey[400]}`,
        borderRadius: '50%',
        padding: typography.pxToRem(12),
    }),
);

import { Stack as MuiStack, styled } from '@mui/material';

export const StyledStack = styled(MuiStack)(
    ({ theme: { spacing, palette, typography } }) => ({
        padding: spacing(4),
        backgroundColor: palette.grey[100],
        borderRadius: typography.pxToRem(10),
    }),
);

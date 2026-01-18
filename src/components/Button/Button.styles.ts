import { Button as MuiButton, darken, styled } from '@mui/material';

import { StyledButtonProps } from './Button.types';

const customProps: PropertyKey[] = ['fontColor', 'backgroundColor'];

export const StyledButton = styled(MuiButton, {
    shouldForwardProp: (prop) => !customProps.includes(prop),
})<StyledButtonProps>(
    ({ theme: { palette, typography }, fontColor, backgroundColor }) => ({
        color: fontColor ?? palette.grey[50],
        backgroundColor: backgroundColor ?? palette.primary.main,
        textTransform: 'none',
        borderRadius: typography.pxToRem(10),
        width: 'fit-content',

        '&:hover': {
            backgroundColor: darken(
                backgroundColor ?? palette.primary.main,
                0.2,
            ),
        },
    }),
);

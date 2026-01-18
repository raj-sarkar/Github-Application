import { styled, SvgIcon as MuiSvgIcon } from '@mui/material';

import { ICON_SIZE } from '@constant';

import type { StyledSvgiconProps } from './Icon.types';

const customProps: PropertyKey[] = ['size', 'iconColor'];

export const StyledSvgIcon = styled(MuiSvgIcon, {
    shouldForwardProp: (prop) => !customProps.includes(prop),
})<StyledSvgiconProps>(
    ({ theme: { palette, typography }, size = 'sm', iconColor }) => ({
        width: typography.pxToRem(ICON_SIZE[size]),
        height: typography.pxToRem(ICON_SIZE[size]),
        color: iconColor ?? palette.grey[900],
    }),
);

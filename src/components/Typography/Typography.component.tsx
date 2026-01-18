import { useTheme } from '@mui/material';

import { StyledTypography } from './Typography.styles';
import type { TypographyProps } from './Typography.types';

/**
 * Typography wrapper with optional line clamping.
 * @param props - Component props
 * @param props.lines - number of lines for line-clamp ( default 1 )
 * @returns JSX element
 */
export const Typography = (props: TypographyProps) => {
    const { lines = 1, color, ...rest } = props;

    const theme = useTheme();

    return (
        <StyledTypography
            lines={lines}
            color={color ? color : theme.palette.grey[900]}
            {...rest}
        />
    );
};

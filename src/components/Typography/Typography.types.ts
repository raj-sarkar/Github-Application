import type { TypographyProps as MuiTypographyProps } from '@mui/material';

/**
 * Props for typography component
 * @property lines - number of lines for line-clamp
 */
export type TypographyProps = MuiTypographyProps & {
    lines?: number;
};

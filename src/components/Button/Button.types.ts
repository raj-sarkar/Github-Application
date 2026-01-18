import { ReactNode } from 'react';

import type { ButtonProps as MuiButtonProps } from '@mui/material';

/**
 * Props for Styled Button component
 * @property fontColor - color of text
 * @property backgroundColor - color of background
 */
export type StyledButtonProps = MuiButtonProps & {
    fontColor?: string;
    backgroundColor?: string;
};

/**
 * Props for Button component
 * @property children - child elements of button
 */
export type ButtonProps = StyledButtonProps & {
    children: ReactNode;
};

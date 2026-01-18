import type { IconButtonProps as MuiIconButtonProps } from '@mui/material';

import { ICON_SIZE } from '@constant';

type CustomMuiIconButtonProps = Omit<
    MuiIconButtonProps,
    'children' | 'color' | 'size'
>;

/**
 * Props for icon button component
 * @property icon - icon to render
 * @property iconColor - color of the icon
 * @property size - size of the icon
 */
export type IconButtonProps = CustomMuiIconButtonProps & {
    icon: React.ElementType;
    iconColor?: string;
    size?: keyof typeof ICON_SIZE;
};

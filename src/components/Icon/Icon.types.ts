import type { SvgIconProps as MuiSvgIconProps } from '@mui/material';

import { ICON_SIZE } from '@constant';

type CustomMuiSvgIconProps = Omit<MuiSvgIconProps, 'fontSize' | 'color'>;

/**
 * Props for styled Svgicon
 * @property size - size of the icon
 * @property iconColor - color of the icon
 */
export type StyledSvgiconProps = CustomMuiSvgIconProps & {
    size?: keyof typeof ICON_SIZE;
    iconColor?: string;
};

/**
 * Props for the icon component
 * @property icon - icon to render
 */
export type IconProps = StyledSvgiconProps & {
    icon: React.ElementType;
};

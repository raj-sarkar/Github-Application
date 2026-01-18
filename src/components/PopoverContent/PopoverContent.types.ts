import type { SvgIconProps as MuiSvgIconProps } from '@mui/material';

/**
 * Type of each popover item
 * @property text - text of popover item
 * @property icon - icon of popover item
 * @property clickFunction - function to call upon clicking the item
 * @property show - true when the item has to be shown
 */
export type PopoverItem = {
    id: string;
    text: string;
    show: boolean;
    icon: React.ComponentType<MuiSvgIconProps>;
    clickFunction: () => void | Promise<void>;
};

/**
 * Props for popover content component
 * @property popoverItem - array of popover item
 */
export type PopoverContentProps = {
    popoverItem: PopoverItem;
};

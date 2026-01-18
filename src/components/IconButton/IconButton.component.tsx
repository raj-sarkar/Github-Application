import { IconButton as MuiIconButton, useTheme } from '@mui/material';

import { Icon } from '@components/Icon';

import type { IconButtonProps } from './IconButton.types';

/**
 * @param props - props for icon button component
 * @param props.icon - icon to render
 * @param props.iconColor - color of the icon
 * @param props.size - size of icon
 * @returns component to make a button of a icon
 */
export const IconButton = (props: IconButtonProps) => {
    const theme = useTheme();
    const {
        icon,
        iconColor = theme.palette.grey[900],
        size = 'sm',
        ...rest
    } = props;

    return (
        <MuiIconButton {...rest}>
            <Icon icon={icon} iconColor={iconColor} size={size} />
        </MuiIconButton>
    );
};

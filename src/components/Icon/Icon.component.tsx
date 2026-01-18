import { StyledSvgIcon } from './Icon.styles';
import type { IconProps } from './Icon.types';

/**
 * Component to render a icon
 * @param props - props for icon component
 * @param props.size - size of the icon (default sm)
 * @param props.icon - icon to render
 * @param props.iconColor - color of icon
 * @returns JSX Element
 */
export const Icon = (props: IconProps) => {
    const { size = 'sm', icon, iconColor, ...rest } = props;

    return (
        <StyledSvgIcon
            size={size}
            iconColor={iconColor}
            component={icon}
            {...rest}
        />
    );
};

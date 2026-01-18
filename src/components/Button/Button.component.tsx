import { StyledButton } from './Button.styles';
import type { ButtonProps } from './Button.types';

/**
 *
 * @param props - Button component props
 * @param props.children - Child elements to render inside the button
 * @param props.fontColor - Custom text color (defaults to theme grey[50])
 * @param props.backgroundColor - Custom background color (defaults to theme primary.main)
 * @returns A styled MUI button component
 */
export const Button = (props: ButtonProps) => {
    const { children, fontColor, backgroundColor, ...rest } = props;

    return (
        <StyledButton
            fontColor={fontColor}
            backgroundColor={backgroundColor}
            {...rest}
        >
            {children}
        </StyledButton>
    );
};

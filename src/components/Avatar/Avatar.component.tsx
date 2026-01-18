import { StyledAvatar } from './Avatar.styles';
import type { AvatarProps } from './Avatar.types';

/**
 * @param props - Props of Avatar component
 * @param props.size - size of the avatar ( default:- lg )
 * @param props.isCursorPointer - boolean value cursor is pointer or not
 * @returns component to render a avatar
 */
export const Avatar = (props: AvatarProps) => {
    const { size = 'lg', isCursorPointer, ...rest } = props;

    return (
        <StyledAvatar size={size} isCursorPointer={isCursorPointer} {...rest} />
    );
};

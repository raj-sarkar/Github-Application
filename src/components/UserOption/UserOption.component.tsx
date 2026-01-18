import { Box as MuiBox, Stack as MuiStack } from '@mui/material';

import { Avatar } from '@components/Avatar';
import { Typography } from '@components/Typography';

import type { UserOptionProps } from './UserOption.types';

/**
 * @param props - props for user option component
 * @param props.option - user data that will be shown as option
 * @param props.isDesktop - boolean value of width is desktop or not
 * @returns component to render a user as option in the dropdown of searchbar
 */
export const UserOption = (props: UserOptionProps) => {
    const { isDesktop, option } = props;

    return (
        <MuiStack direction="row" gap={2} alignItems="center">
            <Avatar
                src={option.avatarURL}
                alt={option.name}
                size={isDesktop ? 'md' : 'sm'}
            />
            <MuiBox>
                <Typography variant={isDesktop ? 'h3' : 'body1'}>
                    {option.name}
                </Typography>
            </MuiBox>
        </MuiStack>
    );
};

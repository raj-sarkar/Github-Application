import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material';

import { ROUTE_PATH } from '@constant';
import { useAppSelector, useDebounceCallback } from '@hooks';
import type { ModifiedUser } from '@models';
import { useGetUserQuery, useGetUsersQuery } from '@services';

import { StyledAutocomplete, StyledTextField } from './Searchbar.styles';
import type { SearchbarProps } from './Searchbar.types';

/**
 * Searchbar component with autocomplete and loading state
 * @param props - Props for searchbar component
 * @param props.renderUserOption - render function to render options in searchbar dropdown
 * @param props.isDesktop - boolean value of view width is desktop or not
 * @returns JSX Element
 */
export const Searchbar = <T extends ModifiedUser>(props: SearchbarProps<T>) => {
    const { renderUserOption, isDesktop } = props;

    const [input, setInput] = useState<string>('');
    const [optionValue, setOptionValue] = useState<string>('');

    const {
        data: userList,
        isLoading: isLoadingUserList,
        isFetching: isFetchingUserList,
    } = useGetUsersQuery(input, { skip: !input });
    const {
        data: user,
        isLoading: isLoadingUser,
        isFetching: isFetchingUser,
        isError,
        error,
    } = useGetUserQuery(optionValue, { skip: !optionValue });
    const navigate = useNavigate();
    const theme = useTheme();

    const authUser = useAppSelector((state) => state.auth.authUser);
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const users = (
        !input || isFetchingUserList || isTyping ? [] : (userList ?? [])
    ) as T[];

    /**
     * @param value - input value of text field
     * @description Set to value of input to the input state with debouncing
     */
    const handleInputChange = useDebounceCallback((value: string) => {
        setInput(value);
        setIsTyping(false);
    });

    /**
     * @param value - input value of text field
     * @description Start the typing state and call debounced inputchange function
     */
    const handleChange = (value: string) => {
        const target = authUser ? ROUTE_PATH.SUGGESTIONS : ROUTE_PATH.LOGIN;

        if (value === '') {
            setOptionValue('');
            setInput('');
            void navigate(target);
            return;
        }

        setIsTyping(true);
        handleInputChange(value);
    };

    /**
     * @param value - value of the option
     * @description take the value of option update that to option state
     */
    const handleOnChange = (value: string): void => {
        setOptionValue(value);
    };

    useEffect(() => {
        if (!isLoadingUser && !isFetchingUser && optionValue) {
            if (isError) {
                void navigate(ROUTE_PATH.NOT_FOUND);
            } else if (user) {
                void navigate(`/profile/${optionValue}`);
            }
        }
    }, [
        isLoadingUser,
        isFetchingUser,
        isError,
        error,
        user,
        optionValue,
        navigate,
    ]);

    return (
        <StyledAutocomplete
            id="searchbar"
            freeSolo
            renderInput={(params) => (
                <StyledTextField {...params} placeholder="Search users" />
            )}
            loading={
                isTyping ||
                isLoadingUserList ||
                isFetchingUserList ||
                isFetchingUser ||
                isLoadingUser
            }
            fullWidth
            options={users}
            filterOptions={(options, { inputValue }) =>
                options.filter((option) =>
                    option.name.includes(inputValue.trim()),
                )
            }
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
            }
            onInputChange={(_, value) => handleChange(value.trim())}
            onChange={(_, value) => {
                if (!value) return;
                handleOnChange(typeof value === 'string' ? value : value.name);
            }}
            renderOption={(
                renderProps: React.HTMLAttributes<HTMLLIElement> & {
                    key: string;
                },
                option,
            ) => {
                const { key = '', ...optionProps } = renderProps;
                return (
                    <li key={option.id + key} {...optionProps}>
                        {renderUserOption({ option: option as T, isDesktop })}
                    </li>
                );
            }}
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: theme.palette.background.default,
                        border: `${theme.typography.pxToRem(1)} solid ${theme.palette.grey[200]}`,
                    },
                },
            }}
        />
    );
};

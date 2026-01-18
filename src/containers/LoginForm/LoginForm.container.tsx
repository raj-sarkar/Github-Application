import { useEffect, useState } from 'react';

import GitHubIcon from '@mui/icons-material/GitHub';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {
    Box as MuiBox,
    CircularProgress as MuiCircularProgress,
    useTheme,
} from '@mui/material';

import { Icon } from '@components/Icon';
import { InputField } from '@components/InputField';
import { Typography } from '@components/Typography';
import { setCredentials } from '@features/auth';
import { setFollowingList } from '@features/following';
import { showSnackbar } from '@features/snackbar';
import { useAppDispatch } from '@hooks';
import {
    useLazyGetFollowingsOfAuthenticatedUserQuery,
    useLazyLoginQuery,
} from '@services';

import { StyledBox, StyledButton } from './LoginForm.styles';
import type {
    InputFieldItem,
    LoginErrorType,
    LoginFormProps,
} from './LoginForm.types';

/**
 * Component to render login form
 * @param props - props of login form component
 * @param props.isDesktop - true if view width is desktop
 * @returns JSX Element
 */
export const LoginForm = (props: LoginFormProps) => {
    const { isDesktop } = props;

    const [
        triggerLogin,
        { isLoading: isLoadingLogin, isFetching: isFetchingLogin },
    ] = useLazyLoginQuery();
    const [
        getFollowing,
        { isLoading: isLoadingFollowing, isFetching: isFetchingFollowing },
    ] = useLazyGetFollowingsOfAuthenticatedUserQuery();
    const dispatch = useAppDispatch();
    const theme = useTheme();

    const [username, setUsername] = useState<string>('');
    const [errorUsername, setErrorUsername] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [errorToken, setErrorToken] = useState<string>('');

    /**
     * @description Checks all the validation. Shows snackbar on invalidation
     * @returns true if form is valid, false otherwise
     */
    const isValidForm = () => {
        if (!username) {
            setErrorUsername('Username is required');
            return false;
        }

        if (!token) {
            setErrorToken('Token is required');
            return false;
        }

        return true;
    };

    /**
     * Handles the form submission event for the login process.
     * @description validates the form, checks the credentials through API, shows snackbar on success/error
     * @param e - The synthetic form submission event.
     * @returns {Promise<void>} This function does not explicitly return a value.
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isValidForm()) return;

        try {
            const res = await triggerLogin(token).unwrap();

            if (res) {
                if (res.username.toLowerCase() === username.toLowerCase()) {
                    dispatch(setCredentials({ user: res, token }));
                    const followingUserList = await getFollowing().unwrap();
                    const followingUsernames = followingUserList.map(
                        (user) => user.name,
                    );
                    dispatch(
                        setFollowingList({ following: followingUsernames }),
                    );
                    dispatch(
                        showSnackbar({
                            message: 'Logged in successfully',
                            severity: 'success',
                            autoHideDuration: 3000,
                        }),
                    );
                } else {
                    dispatch(
                        showSnackbar({
                            message: 'Invalid credentials',
                            autoHideDuration: 3000,
                        }),
                    );
                }
            }
        } catch (err: unknown) {
            if ((err as LoginErrorType).data.status === 401) {
                dispatch(
                    showSnackbar({
                        message: 'Invalid token',
                        autoHideDuration: 3000,
                    }),
                );
            } else {
                const message = (err as LoginErrorType).data.message;

                if (message) {
                    dispatch(showSnackbar({ message, autoHideDuration: 3000 }));
                } else {
                    dispatch(
                        showSnackbar({
                            message: 'Something went wrong',
                            autoHideDuration: 3000,
                        }),
                    );
                }
            }
        }
    };

    const inputFieldItems: InputFieldItem[] = [
        {
            id: 'input-1',
            placeholder: 'Username',
            icon: PersonIcon,
            onChange: (e) => setUsername(e.target.value.trim()),
            error: errorUsername,
        },
        {
            id: 'input-2',
            placeholder: 'Token',
            icon: VpnKeyIcon,
            onChange: (e) => setToken(e.target.value.trim()),
            error: errorToken,
            type: 'password',
        },
    ];

    useEffect(() => {
        if (username) setErrorUsername('');
    }, [username]);

    useEffect(() => {
        if (token) setErrorToken('');
    }, [token]);

    return (
        <form onSubmit={(e) => void handleSubmit(e)}>
            <StyledBox gap={theme.spacing(8)}>
                <Icon
                    icon={GitHubIcon}
                    iconColor={theme.palette.primary.dark}
                    size={isDesktop ? 'lg' : 'md'}
                />
                <MuiBox textAlign="center">
                    <Typography variant={isDesktop ? 'h2' : 'h3'}>
                        Welcome Back!
                    </Typography>
                    <Typography
                        variant={isDesktop ? 'h3' : 'h4'}
                        color={theme.palette.grey[500]}
                    >
                        Sign in to your account
                    </Typography>
                </MuiBox>
                {inputFieldItems.map((item) => (
                    <InputField inputFieldItem={item} key={item.id} />
                ))}
                <StyledButton
                    type="submit"
                    backgroundColor={theme.palette.primary.dark}
                >
                    {isLoadingLogin ||
                    isFetchingLogin ||
                    isLoadingFollowing ||
                    isFetchingFollowing ? (
                        <MuiCircularProgress color="inherit" size={20} />
                    ) : (
                        'Log in'
                    )}
                </StyledButton>
            </StyledBox>
        </form>
    );
};

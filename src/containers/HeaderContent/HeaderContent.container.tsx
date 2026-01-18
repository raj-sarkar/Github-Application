import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import GitHubIcon from '@mui/icons-material/GitHub';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Box as MuiBox,
    Divider as MuiDivider,
    FormControlLabel as MuiFormControlLabel,
    Popover as MuiPopover,
    Stack as MuiStack,
    useTheme,
} from '@mui/material';

import { Avatar } from '@components/Avatar';
import { Icon } from '@components/Icon';
import type { PopoverItem } from '@components/PopoverContent';
import { PopoverContent } from '@components/PopoverContent';
import { Typography } from '@components/Typography';
import { UserOption } from '@components/UserOption';
import { ROUTE_PATH } from '@constant';
import { Searchbar } from '@containers/Searchbar';
import { logout } from '@features/auth';
import { setMode } from '@features/theme';
import { useAppDispatch, useAppSelector } from '@hooks';
import { persistor } from '@store';

import {
    StyledBox,
    StyledFormGroup,
    StyledIconButton,
    StyledSwitch,
} from './HeaderContent.styles';
import type { HeaderProps } from './HeaderContent.types';

/**
 * Container to render the content of header (e.g. logo,searchbar,avatar,login button)
 * @param props - Props for header component
 * @param props.isDesktop - boolean value of view width is desktop or not
 * @param props.showLoginButton - true if login button has to be shown
 * @returns JSX Element
 */
export const HeaderContent = (props: HeaderProps) => {
    const { isDesktop, showLoginButton } = props;

    const authUser = useAppSelector((state) => state.auth.authUser);
    const mode = useAppSelector((state) => state.theme.mode);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const open = Boolean(anchorEl);
    const id = open ? 'avatar-popover' : undefined;

    const popoverData: PopoverItem[] = [
        {
            id: 'item-1',
            text: 'Profile',
            icon: PersonIcon,
            clickFunction: () => {
                setAnchorEl(null);
                void navigate(`/profile/${authUser?.username}`);
            },
            show: !!authUser,
        },
        {
            id: 'item-2',
            text: 'Sign out',
            icon: LogoutIcon,
            clickFunction: async () => {
                dispatch(logout());
                await persistor.purge();
                setAnchorEl(null);
            },
            show: !!authUser,
        },
        {
            id: 'item-3',
            text: 'Log In',
            icon: LoginIcon,
            clickFunction: () => {
                void navigate(ROUTE_PATH.LOGIN);
                setAnchorEl(null);
            },
            show: !authUser && showLoginButton,
        },
    ];

    /**
     * Handles toggle event . Changes the theme mode according to switch
     * @param event switch toggle event
     */
    const handleToggleMode = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            dispatch(setMode({ mode: 'dark' }));
        } else {
            dispatch(setMode({ mode: 'light' }));
        }
    };

    return (
        <MuiStack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
        >
            <MuiStack
                direction="row"
                gap={isDesktop ? 6 : 4}
                width={isDesktop ? '50%' : '70%'}
                alignItems="center"
            >
                <Link
                    to={ROUTE_PATH.SUGGESTIONS}
                    aria-label="Go to suggestions page"
                >
                    <Icon icon={GitHubIcon} size="md" />
                </Link>
                <Searchbar
                    renderUserOption={UserOption}
                    isDesktop={isDesktop}
                />
            </MuiStack>
            <MuiBox>
                {authUser ? (
                    <Avatar
                        src={authUser?.avatarURL}
                        alt="user profile image"
                        isCursorPointer={true}
                        aria-label="See user details"
                        aria-describedby={id}
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        component="button"
                    />
                ) : (
                    <StyledIconButton
                        icon={SettingsIcon}
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        aria-describedby={id}
                    />
                )}
                <MuiPopover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    sx={{ marginTop: 5 }}
                >
                    <StyledBox padding={2} width={200}>
                        {authUser && (
                            <>
                                <MuiStack
                                    direction="row"
                                    gap={3}
                                    marginBottom={2}
                                    alignItems="center"
                                >
                                    <Avatar
                                        src={authUser.avatarURL}
                                        size="md"
                                        alt="User profile image"
                                        aria-label="See user details"
                                        aria-describedby={id}
                                    />
                                    <MuiBox>
                                        <Typography variant="subtitle1">
                                            {authUser.name}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color={theme.palette.grey[500]}
                                        >
                                            {authUser.username}
                                        </Typography>
                                    </MuiBox>
                                </MuiStack>
                                <MuiDivider
                                    component="hr"
                                    color={theme.palette.grey[300]}
                                />
                            </>
                        )}
                        <MuiStack marginTop={theme.spacing(2)} gap={2}>
                            {popoverData.map((item) => (
                                <PopoverContent
                                    popoverItem={item}
                                    key={item.id}
                                />
                            ))}
                            <StyledFormGroup>
                                <MuiFormControlLabel
                                    control={
                                        <StyledSwitch
                                            checked={mode === 'dark'}
                                            onChange={handleToggleMode}
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Toggle Theme
                                        </Typography>
                                    }
                                />
                            </StyledFormGroup>
                        </MuiStack>
                    </StyledBox>
                </MuiPopover>
            </MuiBox>
        </MuiStack>
    );
};

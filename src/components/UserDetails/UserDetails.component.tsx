import { useTheme } from '@mui/material';

import { Typography } from '@components/Typography';

import { StyledLink, StyledLinkTypography } from './UserDetails.styles';
import type { UserDetailsProps } from './UserDetails.types';

/**
 * Component to render user details
 * @param props Props for UserDetails component
 * @param props.item - user info to show
 * @param props.iDesktop - true if view width is desktop
 * @returns JSX Element
 */
export const UserDetails = (props: UserDetailsProps) => {
    const { item, isDesktop } = props;

    const theme = useTheme();

    return (
        <>
            {item.link && item.text !== null ? (
                <StyledLink
                    to={item.link}
                    target={item.isTargetBlank ? '_blank' : '_self'}
                    onClick={(e) => e.stopPropagation()}
                >
                    <StyledLinkTypography
                        variant={isDesktop ? 'h3' : 'body1'}
                        lines={2}
                        color={theme.palette.primary.main}
                    >
                        {item.title}:{' '}
                        <Typography
                            variant={isDesktop ? 'h4' : 'body2'}
                            component="span"
                            color="inherit"
                            sx={{ display: 'inline' }}
                        >
                            {item.text ?? 'NA'}
                        </Typography>
                    </StyledLinkTypography>
                </StyledLink>
            ) : (
                <Typography variant={isDesktop ? 'h3' : 'body1'} lines={5}>
                    {item.title}:{' '}
                    <Typography
                        variant={isDesktop ? 'h4' : 'body2'}
                        color={theme.palette.grey[500]}
                        component="span"
                        sx={{ display: 'inline' }}
                    >
                        {item.text ? item.text : 'NA'}
                    </Typography>
                </Typography>
            )}
        </>
    );
};

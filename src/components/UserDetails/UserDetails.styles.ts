import { Link } from 'react-router-dom';

import { styled } from '@mui/material';

import { Typography } from '@components/Typography';

export const StyledLink = styled(Link)(({ theme: { palette } }) => ({
    color: palette.primary.main,
    textDecoration: 'none',
    width: 'fit-content',

    '&:hover': {
        color: palette.success.main,
    },
}));

export const StyledLinkTypography = styled(Typography)(
    ({ theme: { palette } }) => ({
        color: palette.primary.main,
        '&:hover': {
            color: palette.success.main,
        },
    }),
);

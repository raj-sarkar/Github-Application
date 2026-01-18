import { Link } from 'react-router-dom';

import { styled } from '@mui/material';

export const StyledLink = styled(Link)(({ theme: { palette } }) => ({
    color: palette.primary.main,
    textDecoration: 'none',

    '&:hover': {
        color: palette.success.main,
    },
}));

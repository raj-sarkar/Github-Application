import type { Theme } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

import { SCALING_FACTOR, THEME_MODES } from '@constant';

/* Customized MUI components themes */
import { components } from './components';
/* Customized foundation themes */
import { breakpoints, getPallete, mixins, typography } from './foundations';

export const getTheme = (mode: (typeof THEME_MODES)[number]): Theme => {
    /* 
    Initialize the theme with base theme elements (excluding typography styles and spacing to ensure the theme has correct breakpoints and pxToRem function set.)
    */
    let theme: Theme = createTheme({
        palette: getPallete(mode),
        breakpoints,
        mixins,
        components,
        typography: {
            fontFamily: 'Inter',
            ...typography.typographyUtil,
        },
        spacing: (factor: number) =>
            theme.typography.pxToRem(factor * SCALING_FACTOR),
    });

    /* Extend the base theme with additional configurations */
    theme = createTheme(theme, {
        typography: {
            ...typography.typographyStyle(theme),
        },
    });

    return theme;
};

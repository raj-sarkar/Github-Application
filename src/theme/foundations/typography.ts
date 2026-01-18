import type { Theme } from '@mui/material/styles';
import type {
    TypographyOptions,
    TypographyUtils,
} from '@mui/material/styles/createTypography';

import { HTML_FONT_SIZE } from '@constant';

const FONTWEIGHTS = {
    FONT_WEIGHT_LIGHT: 400,
    FONT_WEIGHT_REGULAR: 500,
    FONT_WEIGHT_MEDIUM: 600,
} as const;
const DEFAULT_LINE_HEIGHT = '150%';

/* Custom px to rem function */
const typographyUtil: TypographyUtils = {
    /**
     * Converts a pixel value to rem units.
     * @param px - The pixel value to convert.
     * @returns The equivalent value in rem units as a string.
     */
    pxToRem: (px: number) => `${px / HTML_FONT_SIZE}` + 'rem',
};

// TODO: Add the necessary typographies here.
/**
 * Creates a typography block with various styles
 * @param theme - Theme object to access the breakpoints.
 * @returns The function returns a TypographyOptions object, which includes various typography settings,
 */
const typographyStyle = (theme: Theme): TypographyOptions => ({
    fontFamily: 'Inter',
    htmlFontSize: HTML_FONT_SIZE,

    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,

    h1: {
        fontSize: typographyUtil.pxToRem(24),
        fontWeight: 700,
        lineHeight: typographyUtil.pxToRem(45),

        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(36),
            lineHeight: typographyUtil.pxToRem(62.5),
        },
    },
    h2: {
        fontSize: typographyUtil.pxToRem(16),
        fontWeight: FONTWEIGHTS.FONT_WEIGHT_MEDIUM,
        lineHeight: DEFAULT_LINE_HEIGHT,
        [theme.breakpoints.up('md')]: {
            fontSize: typographyUtil.pxToRem(24),
        },
    },
    h3: {
        fontSize: typographyUtil.pxToRem(16),
        fontWeight: FONTWEIGHTS.FONT_WEIGHT_REGULAR,
        lineHeight: DEFAULT_LINE_HEIGHT,
    },
    h4: {
        fontSize: typographyUtil.pxToRem(16),
        fontWeight: FONTWEIGHTS.FONT_WEIGHT_LIGHT,
        lineHeight: DEFAULT_LINE_HEIGHT,
    },
    subtitle1: {
        fontSize: typographyUtil.pxToRem(14),
        fontWeight: FONTWEIGHTS.FONT_WEIGHT_MEDIUM,
        lineHeight: DEFAULT_LINE_HEIGHT,
    },
    subtitle2: {
        fontSize: typographyUtil.pxToRem(14),
        fontWeight: FONTWEIGHTS.FONT_WEIGHT_LIGHT,
        lineHeight: DEFAULT_LINE_HEIGHT,
    },
    body1: {
        fontSize: typographyUtil.pxToRem(12),
        fontWeight: FONTWEIGHTS.FONT_WEIGHT_MEDIUM,
        lineHeight: DEFAULT_LINE_HEIGHT,
    },
    body2: {
        fontSize: typographyUtil.pxToRem(10),
        fontWeight: FONTWEIGHTS.FONT_WEIGHT_LIGHT,
        lineHeight: DEFAULT_LINE_HEIGHT,
    },
});

export const typography = { typographyStyle, typographyUtil };

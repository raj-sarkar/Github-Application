import { THEME_MODES } from '@constant';

/**
 * Types in theme state
 * @property mode - theme mode of application
 */
export type ThemeState = {
    mode: (typeof THEME_MODES)[number];
};

import type { PaletteOptions } from '@mui/material/styles';

import { THEME_MODES } from '@constant';

export const getPallete = (
    mode: (typeof THEME_MODES)[number],
): PaletteOptions => {
    const palette: PaletteOptions =
        mode === 'light'
            ? {
                  primary: {
                      main: '#4F7C82',
                      dark: '#0B2E33',
                      light: '#93B1B5',
                      contrastText: '#B8E3E9',
                  },
                  grey: {
                      50: '#F9FAFB',
                      100: '#F3F4F6',
                      200: '#E5E7EB',
                      300: '#D1D5DB',
                      400: '#9CA3AF',
                      500: '#6B7280',
                      600: '#4B5563',
                      700: '#374151',
                      800: '#1F2937',
                      900: '#111827',
                  },
                  background: {
                      default: '#FFFFFF',
                  },
              }
            : {
                  primary: {
                      main: '#7CC3CA',
                      dark: '#FFFFFF',
                      light: '#0B2E33',
                      contrastText: '#E6F7F9',
                  },
                  grey: {
                      50: '#111827',
                      100: '#1F2937',
                      200: '#374151',
                      300: '#4B5563',
                      400: '#6B7280',
                      500: '#9CA3AF',
                      600: '#D1D5DB',
                      700: '#E5E7EB',
                      800: '#F3F4F6',
                      900: '#F9FAFB',
                  },
                  background: {
                      default: '#000000',
                  },
              };
    return palette;
};

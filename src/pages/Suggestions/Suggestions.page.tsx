import { Box as MuiBox, useMediaQuery, useTheme } from '@mui/material';

import { Suggestions as SuggestionsContainer } from '@containers/Suggestions';

/**
 * Page that contains the container & components for suggestions page
 * @returns JSX Element
 */
export const Suggestions = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <MuiBox padding={isDesktop ? 6 : 4}>
            <SuggestionsContainer />
        </MuiBox>
    );
};

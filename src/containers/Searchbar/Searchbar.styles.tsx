import { forwardRef } from 'react';

import {
    Autocomplete as MuiAutocomplete,
    styled,
    TextField as MuiTextField,
} from '@mui/material';

import { FONTWEIGHTS } from '@constant';
import type { ModifiedUser } from '@models';

import type { StyledAutocompleteProps } from './Searchbar.types';

const StyledAutocompleteInner = <T extends ModifiedUser>(
    props: StyledAutocompleteProps<T>,
    ref: React.Ref<HTMLDivElement>,
) => <MuiAutocomplete<T, false, false, true> ref={ref} {...props} />;

export const StyledAutocomplete = styled(forwardRef(StyledAutocompleteInner))<
    StyledAutocompleteProps<ModifiedUser>
>(({ theme: { palette, typography, spacing } }) => ({
    backgroundColor: palette.grey[100],
    borderRadius: typography.pxToRem(12),

    '& .MuiInputBase-root': {
        borderRadius: typography.pxToRem(12),
        boxShadow: `${spacing(0, 0.25, 1)} ${palette.grey[400]}`,
        color: palette.grey[900],
    },

    '& .MuiOutlinedInput-notchedOutline': {
        border: `${typography.pxToRem(1)} solid ${palette.grey[200]}`,
    },

    '& .MuiAutocomplete-clearIndicator': {
        color: palette.grey[900],
    },
}));

export const StyledTextField = styled(MuiTextField)(
    ({ theme: { typography, palette } }) => ({
        '& .MuiInputBase-input::placeholder': {
            fontSize: typography.pxToRem(16),
            fontWeight: FONTWEIGHTS.FONT_WEIGHT_MEDIUM,
            color: palette.grey[900],
        },
    }),
);

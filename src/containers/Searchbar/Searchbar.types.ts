import type { AutocompleteProps as MuiAutocompleteProps } from '@mui/material';

import { ModifiedUser } from '@models';

/**
 * Props of styled Autocomplete function
 */
export type StyledAutocompleteProps<T extends ModifiedUser> =
    MuiAutocompleteProps<T, false, false, true>;

/**
 * Props for render user function
 * @property option - user details to show
 * @property isDesktop - boolean value of view width is desktop or not
 */
type RenderUserOptionProps<T extends ModifiedUser> = {
    option: T;
    isDesktop: boolean;
};

/**
 * Props for searchbar
 * @property renderUserOption - function to render the user options
 * @property isDesktop - boolean value of view width is desktop or not
 */
export type SearchbarProps<T extends ModifiedUser> = {
    renderUserOption: (props: RenderUserOptionProps<T>) => React.ReactNode;
    isDesktop: boolean;
};

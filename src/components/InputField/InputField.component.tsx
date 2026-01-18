import {
    FormHelperText as MuiFormHelperText,
    InputAdornment as MuiInputAdornment,
} from '@mui/material';

import { Icon } from '@components/Icon';

import { StyledFormControl, StyledTextField } from './InputField.styles';
import { InputFieldsProps } from './InputField.types';

/**
 *
 * @param props - props for input field component
 * @param props.inputFieldItem - input item to render
 * @returns Component for rendering input field
 */
export const InputField = (props: InputFieldsProps) => {
    const { inputFieldItem: item } = props;

    return (
        <StyledFormControl variant="standard">
            <StyledTextField
                variant="outlined"
                autoComplete="off"
                placeholder={item.placeholder}
                onChange={item.onChange}
                type={item.type ?? 'text'}
                slotProps={{
                    input: {
                        startAdornment: (
                            <MuiInputAdornment position="start">
                                <Icon icon={item.icon} />
                            </MuiInputAdornment>
                        ),
                    },
                }}
                aria-describedby={`${item.id}-error-text`}
                error={!!item.error}
            />
            <MuiFormHelperText
                error={!!item.error}
                id={`${item.id}-error-text`}
            >
                {item.error}
            </MuiFormHelperText>
        </StyledFormControl>
    );
};

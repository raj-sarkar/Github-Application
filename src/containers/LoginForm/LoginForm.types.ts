import type { SvgIconProps as MuiSvgIconProps } from '@mui/material';

/**
 * Type of error in login form
 * @property data.documentation_url - url doc of error
 * @property data.message - message of error
 * @property data.status - status of response
 */
export type LoginErrorType = {
    data: {
        documentation_url: string;
        message: string;
        status: string | number;
    };
};

/**
 * Types for input field item
 * @property id - id of item
 * @property icon - icon for start adorment
 * @property onChange - function to call on change input
 * @property placeholder - value of input placeholder
 * @property error - error value of input field
 * @property type - type of input field
 */
export type InputFieldItem = {
    id: string;
    icon: React.ComponentType<MuiSvgIconProps>;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
    placeholder?: string;
    error: string;
    type?: string;
};

/**
 * Props for login form component
 * @property isDesktop - true if view width is desktop
 */
export type LoginFormProps = {
    isDesktop: boolean;
};

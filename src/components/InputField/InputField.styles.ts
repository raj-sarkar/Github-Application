import {
    FormControl as MuiFormControl,
    styled,
    TextField as MuiTextField,
} from '@mui/material';

export const StyledTextField = styled(MuiTextField)(
    ({ theme: { typography, spacing, palette } }) => ({
        '& .MuiInputBase-root': {
            height: typography.pxToRem(50),
            fontSize: typography.pxToRem(15),
        },

        '& .MuiInputBase-input': {
            paddingLeft: spacing(1.5),
            color: palette.grey[900],
        },
    }),
);

export const StyledFormControl = styled(MuiFormControl)(
    ({ theme: { typography, palette } }) => ({
        width: '90%',

        '& .MuiInputBase-root': {
            borderRadius: typography.pxToRem(10),
            border: `${typography.pxToRem(0.25)} solid ${palette.grey[300]}`,
        },
    }),
);

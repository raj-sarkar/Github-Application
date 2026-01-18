import {
    styled,
    TableCell as MuiTableCell,
    TableRow as MuiTableRow,
} from '@mui/material';

import type { StyledTableRowProps } from './Table.types';

const customProps: PropertyKey[] = ['isGrey'];

export const StyledTableRow = styled(MuiTableRow, {
    shouldForwardProp: (prop) => !customProps.includes(prop),
})<StyledTableRowProps>(({ theme: { palette }, isGrey = false }) => ({
    backgroundColor: isGrey ? palette.grey[100] : palette.background.default,
}));

export const StyledTableCell = styled(MuiTableCell)({
    border: 'none',
});

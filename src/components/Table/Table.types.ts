import type {
    TableProps as MuiTableProps,
    TableRowProps as MuiTableRowProps,
} from '@mui/material';

/**
 * Types for columnDef
 * @property columnName - title of the column
 * @property rowRenderer - render component to use in table cell
 */
export type TableColumnDef<T> = {
    columnName: string;
    rowRenderer: (props: T) => React.ReactNode;
};

/**
 * Props for table component
 * @property data - table data
 * @property columnDef - information of each column
 * @property isLoading - true if table data is loading
 * @property nullText - text to show if table is empty
 */
export type TableProps<T> = MuiTableProps & {
    data: T[];
    columnDef: TableColumnDef<T>[];
    isLoading: boolean;
    nullText: string;
};

/**
 * Props of styled table row
 * @property isGrey - true if background has to be grey (default false)
 */
export type StyledTableRowProps = MuiTableRowProps & {
    isGrey?: boolean;
};

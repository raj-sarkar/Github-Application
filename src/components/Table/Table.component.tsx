import {
    Skeleton as MuiSkeleton,
    Table as MuiTable,
    TableBody as MuiTableBody,
    TableCell as MuiTableCell,
    TableHead as MuiTableHead,
} from '@mui/material';

import { Typography } from '@components/Typography';

import { StyledTableCell, StyledTableRow } from './Table.styles';
import type { TableProps } from './Table.types';

/**
 * Generic component to render table
 * @param props - Props for table component
 * @param props.columnDef - information of each column in table
 * @param props.data - data to render as table
 * @param props.isLoading - true if table data is loading
 * @returns JSX Element
 */
export const Table = <T,>(props: TableProps<T>) => {
    const { columnDef, data, isLoading, nullText, ...rest } = props;

    return (
        <MuiTable {...rest} stickyHeader>
            <MuiTableHead>
                <StyledTableRow isGrey>
                    {columnDef.map((item) => (
                        <MuiTableCell key={item.columnName}>
                            <Typography variant="subtitle1" lines={2}>
                                {item.columnName.toUpperCase()}
                            </Typography>
                        </MuiTableCell>
                    ))}
                </StyledTableRow>
            </MuiTableHead>
            <MuiTableBody>
                {isLoading
                    ? Array.from({ length: 2 }).map((_, i) => (
                          <StyledTableRow key={i}>
                              {columnDef.map((col) => (
                                  <MuiTableCell key={col.columnName}>
                                      <MuiSkeleton />
                                  </MuiTableCell>
                              ))}
                          </StyledTableRow>
                      ))
                    : data.map((row, idx) => (
                          <StyledTableRow key={idx} isGrey={idx % 2 !== 0}>
                              {columnDef.map((col) => (
                                  <StyledTableCell key={col.columnName}>
                                      {col.rowRenderer(row)}
                                  </StyledTableCell>
                              ))}
                          </StyledTableRow>
                      ))}
                {!isLoading && data.length === 0 && (
                    <StyledTableRow>
                        <StyledTableCell
                            colSpan={columnDef.length}
                            align="center"
                        >
                            <Typography variant="h3">{nullText}</Typography>
                        </StyledTableCell>
                    </StyledTableRow>
                )}
            </MuiTableBody>
        </MuiTable>
    );
};

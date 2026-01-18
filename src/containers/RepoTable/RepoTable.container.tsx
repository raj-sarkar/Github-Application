import {
    Paper as MuiPaper,
    Stack as MuiStack,
    TableContainer as MuiTableContainer,
    useTheme,
} from '@mui/material';

import { Table, type TableColumnDef } from '@components/Table';
import { Typography } from '@components/Typography';
import type { ModifiedRepoItem } from '@models';
import { useGetReposQuery } from '@services';

import { StyledLink } from './RepoTable.styles';
import type { RepoTableProps } from './RepoTable.types';

/**
 * Container to render repositories as a table through table component
 * @param props Props for repositories table container
 * @param props.isDesktop - true if view width is desktop
 * @param props.username - username of user
 * @returns JSX Element
 */
export const RepoTable = (props: RepoTableProps) => {
    const { isDesktop, username } = props;

    const {
        data: repoList,
        isLoading: isLoadingRepo,
        isFetching: isFetchingRepo,
    } = useGetReposQuery(username ?? '');
    const theme = useTheme();

    const columnDef: TableColumnDef<ModifiedRepoItem>[] = [
        {
            columnName: 'Title',
            rowRenderer: (value) => (
                <Typography variant={isDesktop ? 'h3' : 'subtitle2'} lines={3}>
                    {value.name}
                </Typography>
            ),
        },
        {
            columnName: 'Stars',
            rowRenderer: (value) => (
                <Typography
                    variant={isDesktop ? 'subtitle2' : 'body1'}
                    textAlign="center"
                >
                    {value.starsCount}
                </Typography>
            ),
        },
        {
            columnName: 'Forks',
            rowRenderer: (value) => (
                <Typography
                    variant={isDesktop ? 'subtitle2' : 'body1'}
                    textAlign="center"
                >
                    {value.forksCount}
                </Typography>
            ),
        },
        {
            columnName: 'Open Issues',
            rowRenderer: (value) => (
                <Typography
                    variant={isDesktop ? 'subtitle2' : 'body1'}
                    textAlign="center"
                >
                    {value.openIssuesCount}
                </Typography>
            ),
        },
        {
            columnName: 'Public/ Private',
            rowRenderer: (value) => (
                <Typography
                    variant={isDesktop ? 'subtitle1' : 'body1'}
                    textTransform="capitalize"
                >
                    {value.visibility}
                </Typography>
            ),
        },
        {
            columnName: 'Topics',
            rowRenderer: (value) => (
                <MuiStack direction="row" flexWrap="wrap">
                    {value.topics.map((item, idx) => (
                        <Typography
                            variant={isDesktop ? 'subtitle2' : 'body1'}
                            key={idx}
                            lines={3}
                        >
                            {item}
                            {idx < value.topics.length - 1 ? ', ' : ''}
                        </Typography>
                    ))}
                </MuiStack>
            ),
        },
        {
            columnName: 'Repo Link',
            rowRenderer: (value) => (
                <StyledLink
                    to={value.htmlURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`visit repo ${value.name}`}
                >
                    <Typography
                        variant={isDesktop ? 'subtitle2' : 'body1'}
                        lines={3}
                        color="inherit"
                    >
                        {value.name}
                    </Typography>
                </StyledLink>
            ),
        },
    ];

    return (
        <>
            <Typography variant="h2" margin={theme.spacing(4, 0)}>
                <u>Repositories</u>
            </Typography>
            <MuiTableContainer
                component={MuiPaper}
                sx={{ maxHeight: 300 }}
                variant="outlined"
            >
                <Table
                    data={repoList ?? []}
                    columnDef={columnDef}
                    isLoading={isLoadingRepo || isFetchingRepo}
                    nullText="No repository yet"
                />
            </MuiTableContainer>
        </>
    );
};

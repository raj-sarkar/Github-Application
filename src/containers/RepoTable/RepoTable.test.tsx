import { Providers } from '../../test';

import { Mock } from 'vitest';

import { ModifiedRepoItem } from '@models';
import { useGetReposQuery } from '@services';
import { render, screen } from '@testing-library/react';

import { RepoTable } from './RepoTable.container';

const mockRepoQuery = (
    data: ModifiedRepoItem[] = [],
    isLoading = false,
    isError = false,
    error = null,
) => ({
    data,
    isLoading,
    isFetching: isLoading,
    isError,
    error,
});

const mockRepoData = [
    {
        id: 1,
        name: 'chat-app',
        starsCount: 10,
        forksCount: 2,
        openIssuesCount: 0,
        visibility: 'public',
        topics: [],
        htmlURL: 'repo.com',
    },
];

vi.mock('../../services/user.service', () => ({
    useGetReposQuery: vi.fn(),
}));

describe('RepoTable container test', () => {
    it('Checks if the table headers and null text are rendered', () => {
        (useGetReposQuery as Mock).mockReturnValue(mockRepoQuery([]));

        render(
            <Providers>
                <RepoTable isDesktop={true} username="user" />
            </Providers>,
        );

        expect(screen.getByText('TITLE')).toBeInTheDocument();
        expect(screen.getByText('STARS')).toBeInTheDocument();
        expect(screen.getByText('FORKS')).toBeInTheDocument();
        expect(screen.getByText('OPEN ISSUES')).toBeInTheDocument();
        expect(screen.getByText('PUBLIC/ PRIVATE')).toBeInTheDocument();
        expect(screen.getByText('REPO LINK')).toBeInTheDocument();
        expect(screen.getByText('No repository yet')).toBeInTheDocument();
    });

    it('Checks is the repo response is rendered', () => {
        (useGetReposQuery as Mock).mockReturnValue(mockRepoQuery(mockRepoData));

        render(
            <Providers>
                <RepoTable isDesktop={true} username="user" />
            </Providers>,
        );

        expect(screen.queryAllByText('chat-app')).toBeDefined();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
        expect(screen.getByText('public')).toBeInTheDocument();
    });
});

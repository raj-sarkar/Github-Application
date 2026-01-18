import { Providers } from '../../test';

import { Mock } from 'vitest';

import { UserOption } from '@components/UserOption';
import { ModifiedSingleUser, ModifiedUser } from '@models';
import { useGetUserQuery, useGetUsersQuery } from '@services';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Searchbar } from './Searchbar.container';

const mockGetUsersQuery = (
    data: ModifiedUser[] = [],
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

const mockGetUserQuery = (
    data: ModifiedSingleUser,
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

vi.mock('../../services/user.service', () => ({
    useGetUsersQuery: vi.fn(),
    useGetUserQuery: vi.fn(),
}));

describe('Searchbar container test', () => {
    it('Searchbar seaches correct users', async () => {
        (useGetUsersQuery as Mock).mockReturnValue(
            mockGetUsersQuery([
                {
                    name: 'rajsarkar0641',
                    id: 1,
                    url: 'profile.com',
                    reposURL: 'repourl.com',
                    avatarURL: 'picture.com',
                    followersURL: 'followers.com',
                    followingURL: 'following.com',
                },
            ]),
        );

        (useGetUserQuery as Mock).mockReturnValue(
            mockGetUserQuery({
                username: 'rajsarkar0641',
                name: 'raj sarkar',
                id: 1,
                avatarURL: 'picture.com',
                url: 'profile.com',
                followersURL: 'followers.com',
                followingURL: 'following.com',
                reposURL: 'repourl.com',
                blog: null,
                location: null,
                email: null,
                bio: null,
                followers: 5,
                following: 2,
                createdAt: '2022-05-16 10:30:00',
                updatedAt: '2022-05-16 10:30:00',
            }),
        );

        render(
            <Providers>
                <Searchbar isDesktop={true} renderUserOption={UserOption} />
            </Providers>,
        );

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'r');
        expect(input).toHaveValue('r');
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getByText(/rajsarkar0641/)).toBeInTheDocument();
        });
    });

    it('Searchbar clear button clears the input value', async () => {
        render(
            <Providers>
                <Searchbar isDesktop={true} renderUserOption={UserOption} />
            </Providers>,
        );

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'raj');
        expect(input).toHaveValue('raj');

        const clearBtn = screen.getByLabelText(/Clear/);
        await userEvent.click(clearBtn);

        expect(input).toHaveValue('');
    });
});

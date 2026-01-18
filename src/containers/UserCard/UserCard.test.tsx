import { Providers } from '../../test';

import { Mock } from 'vitest';

import { ModifiedSingleUser } from '@models';
import { useGetUserQuery } from '@services';
import { render, screen } from '@testing-library/react';

import { UserCard } from './UserCard.container';

const mockUserData = {
    name: 'raj',
    id: 1,
    url: 'profile.com',
    reposURL: 'repourl.com',
    avatarURL: 'picture.com',
    followersURL: 'followers.com',
    followingURL: 'following.com',
};

const mockSingleUserData = {
    username: 'raj',
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
};

vi.mock('../../services/user.service', () => ({
    useFollowUserMutation: vi.fn(() => [vi.fn(), {}]),
    useUnfollowUserMutation: vi.fn(() => [vi.fn(), {}]),
    useGetUserQuery: vi.fn(),
}));

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

describe('UserCard container test', () => {
    it('checks if user detail is rendered', async () => {
        (useGetUserQuery as Mock).mockReturnValue(
            mockGetUserQuery(mockSingleUserData),
        );

        render(
            <Providers>
                <UserCard user={mockUserData} />
            </Providers>,
        );

        expect(await screen.findByText(/raj sarkar/)).toBeInTheDocument();
    });
});

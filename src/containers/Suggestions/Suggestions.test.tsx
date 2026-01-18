import { Providers } from '../../test';

import { Mock } from 'vitest';

import { ModifiedSingleUser } from '@models';
import {
    useGetUserQuery,
    useLazyGetRandomUsersQuery,
    useLazyGetUserQuery,
} from '@services';
import { render, screen } from '@testing-library/react';

import { Suggestions } from './Suggestions.conatiner';

vi.mock('../../services/user.service', () => ({
    useFollowUserMutation: vi.fn(() => [vi.fn(), {}]),
    useUnfollowUserMutation: vi.fn(() => [vi.fn(), {}]),
    useGetUserQuery: vi.fn(),
    useLazyGetRandomUsersQuery: vi.fn(),
    useLazyGetUserQuery: vi.fn(),
}));

const mockUserList = [
    {
        name: 'raj',
        id: 1,
        url: 'profile.com',
        reposURL: 'repourl.com',
        avatarURL: 'picture.com',
        followersURL: 'followers.com',
        followingURL: 'following.com',
    },
];

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

describe('Suggestions container test', () => {
    const mockRandomUserTrigger = vi.fn().mockReturnValue({
        unwrap: () => Promise.resolve(mockUserList),
    });
    const mockGetUserTrigger = vi.fn().mockReturnValue({
        unwrap: () => Promise.resolve(mockSingleUserData),
    });

    (useLazyGetRandomUsersQuery as Mock).mockReturnValue([
        mockRandomUserTrigger,
        { isLoading: false, isFetching: false, isError: false },
    ]);
    (useLazyGetUserQuery as Mock).mockReturnValue([
        mockGetUserTrigger,
        { isLoading: false, isFetching: false, isError: false },
    ]);
    (useGetUserQuery as Mock).mockReturnValue(
        mockGetUserQuery(mockSingleUserData),
    );

    it('checks if user is fetched and rendered', async () => {
        render(
            <Providers>
                <Suggestions />
            </Providers>,
        );

        expect(await screen.findByText(/raj sarkar/)).toBeInTheDocument();
    });
});

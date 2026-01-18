import { Providers } from '../../test';

import { Mock } from 'vitest';

import { useGetUserQuery, useLazyGetFollowersQuery } from '@services';
import { render, screen } from '@testing-library/react';

import { Followers } from './Followers.container';

const mockFollowersData = [
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

const mockSingleFollowerData = {
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
    useLazyGetFollowersQuery: vi.fn(),
    useFollowUserMutation: vi.fn(() => [vi.fn(), {}]),
    useUnfollowUserMutation: vi.fn(() => [vi.fn(), {}]),
    useGetUserQuery: vi.fn(),
}));

describe('Followers container test', () => {
    it('checks if follower is rendred', async () => {
        const mockTrigger = vi.fn().mockReturnValue({
            unwrap: () => Promise.resolve(mockFollowersData),
        });

        (useLazyGetFollowersQuery as Mock).mockReturnValue([
            mockTrigger,
            { isLoading: false, isFetching: false, isError: false },
        ]);

        (useGetUserQuery as Mock).mockReturnValue({
            data: mockSingleFollowerData,
            isLoading: false,
            isFetching: false,
        });

        render(
            <Providers>
                <Followers username="user" />
            </Providers>,
        );

        expect(mockTrigger).toHaveBeenCalledTimes(1);
        expect(await screen.findByText(/raj sarkar/)).toBeInTheDocument();
    });
});

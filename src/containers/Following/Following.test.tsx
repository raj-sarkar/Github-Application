import { Providers } from '../../test';

import { Mock } from 'vitest';

import { useGetUserQuery, useLazyGetFollowingQuery } from '@services';
import { render, screen } from '@testing-library/react';

import { Following } from './Following.container';

const mockFollowingData = [
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

const mockSingleFollowingData = {
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
    useLazyGetFollowingQuery: vi.fn(),
    useFollowUserMutation: vi.fn(() => [vi.fn(), {}]),
    useUnfollowUserMutation: vi.fn(() => [vi.fn(), {}]),
    useGetUserQuery: vi.fn(),
}));

describe('Following container test', () => {
    it('checks if following is rendred', async () => {
        const mockTrigger = vi.fn().mockReturnValue({
            unwrap: () => Promise.resolve(mockFollowingData),
        });

        (useLazyGetFollowingQuery as Mock).mockReturnValue([
            mockTrigger,
            { isLoading: false, isFetching: false, isError: false },
        ]);

        (useGetUserQuery as Mock).mockReturnValue({
            data: mockSingleFollowingData,
            isLoading: false,
            isFetching: false,
        });

        render(
            <Providers>
                <Following username="user" />
            </Providers>,
        );

        expect(mockTrigger).toHaveBeenCalledTimes(1);
        expect(await screen.findByText(/raj sarkar/)).toBeInTheDocument();
    });
});

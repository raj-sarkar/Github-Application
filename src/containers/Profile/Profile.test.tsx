import { Providers } from '../../test';

import { Mock } from 'vitest';

import { useLazyGetUserQuery } from '@services';
import { render, screen } from '@testing-library/react';

import { Profile } from './Profile.container';

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
    useLazyGetUserQuery: vi.fn(),
}));

describe('Profile container test', () => {
    it('checks if user detail is rendered', async () => {
        const mockGetUserTrigger = vi.fn().mockReturnValue({
            unwrap: () => Promise.resolve(mockSingleUserData),
        });

        (useLazyGetUserQuery as Mock).mockReturnValue([
            mockGetUserTrigger,
            { isLoading: false, isFetching: false, isError: false },
        ]);

        render(
            <Providers>
                <Profile isDesktop={true} username="user" />
            </Providers>,
        );

        expect(await screen.findByText(/raj sarkar/)).toBeInTheDocument();
    });
});

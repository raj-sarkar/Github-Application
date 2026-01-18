import { Providers } from '../../test';

import { render, screen } from '@testing-library/react';

import { UserOption } from './UserOption.component';

describe('UserOption component test', () => {
    const userDetail = {
        name: 'raj',
        id: 1,
        url: 'profile.com',
        reposURL: 'repourl.com',
        avatarURL: 'picture.com',
        followersURL: 'followers.com',
        followingURL: 'following.com',
    };

    it('checks if elements are rendered', () => {
        render(
            <Providers>
                <UserOption option={userDetail} isDesktop={true} />
            </Providers>,
        );

        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByText('raj')).toBeInTheDocument();
    });
});

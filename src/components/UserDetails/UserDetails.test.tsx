import { Providers } from '../../test';

import { render, screen } from '@testing-library/react';

import { UserDetails } from './UserDetails.component';
import type { UserDetailsItem } from './UserDetails.types';

describe('UserDetails component test', () => {
    it('checks if elements are rendered', () => {
        const item: UserDetailsItem = {
            id: 'field-1',
            title: 'name',
            text: 'Raj',
        };
        render(
            <Providers>
                <UserDetails isDesktop={true} item={item} />
            </Providers>,
        );

        expect(screen.getByText(/name/i)).toBeInTheDocument();
        expect(screen.getByText('Raj')).toBeInTheDocument();
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('checks if text is rendered as link', () => {
        const item: UserDetailsItem = {
            id: 'field-1',
            title: 'followers',
            text: 10,
            link: '/followers',
        };
        render(
            <Providers>
                <UserDetails isDesktop={true} item={item} />
            </Providers>,
        );

        expect(screen.getByText(/followers/i)).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByRole('link')).toBeInTheDocument();
    });
});

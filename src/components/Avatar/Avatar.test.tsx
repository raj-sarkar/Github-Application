import { Providers } from '../../test';

import { render, screen } from '@testing-library/react';

import { Avatar } from './Avatar.component';

describe('Avatar component test', () => {
    it('test whether image exist', () => {
        render(
            <Providers>
                <Avatar src="github.svg" alt="github logo" />
            </Providers>,
        );

        const img = screen.getByRole('img');

        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', 'github.svg');
        expect(img).toHaveAttribute('alt', 'github logo');
        expect(screen.queryByText('github logo')).not.toBeInTheDocument();
    });

    it('test whether children is rendred when image is not', () => {
        render(
            <Providers>
                <Avatar src="" alt="github logo">
                    R
                </Avatar>
            </Providers>,
        );

        const img = screen.queryByRole('img');

        expect(img).not.toBeInTheDocument();
        expect(screen.getByText('R')).toBeInTheDocument();
    });
});
